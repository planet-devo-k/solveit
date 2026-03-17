/**
 * 이슈
 */
export const createIssue = async ({
  github,
  context,
  title,
  body,
  labels,
  assignees,
  milestone,
}) => {
  console.log("이슈 생성 인자:", { labels, assignees, milestone });
  const { data: newIssue } = await github.rest.issues.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    title,
    body,
    labels,
    assignees,
    milestone,
  });
  return newIssue;
};

// 하위 이슈(Sub-issue)를 부모 이슈에 연결합니다. (GraphQL 사용)
export const linkSubIssue = async ({ github, parentNodeId, subIssueId }) => {
  if (!parentNodeId) return;

  const query = `
    mutation($parentId: ID!, $subIssueId: ID!) { 
      addSubIssue(input: {issueId: $parentId, subIssueId: $subIssueId}) { 
        issue { id } 
      } 
    }
  `;

  await github.graphql(query, {
    parentId: parentNodeId,
    subIssueId: subIssueId,
  });
};

/**
 * PR
 */
// 이번 주 월요일 이후에 생성된 모든 PR 목록을 가져옵니다.
export const getThisWeekPullRequests = async ({
  github,
  context,
  thisMonday,
  thisSaturday,
}) => {
  const response = await github.rest.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: "all",
    sort: "created",
    direction: "desc",
  });

  const pullRequests = Array.isArray(response?.data) ? response.data : [];

  return pullRequests.filter((pr) => {
    const createdAt = new Date(pr.created_at);
    return createdAt >= thisMonday && createdAt <= thisSaturday;
  });
};

/**
 * 이슈를 프로젝트 보드에 연결하고 관련 필드(날짜, 상태, 담당자, 마일스톤)를 동기화합니다.
 */
export const syncIssueToProject = async ({
  github,
  projectId,
  contentId,
  startDateFieldId,
  endDateFieldId,
  startDate,
  endDate,
  statusFieldId,
  statusOptionId,
}) => {
  const addMutation = `
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) { item { id } }
    }
  `;
  const addResult = await github.graphql(addMutation, { projectId, contentId });
  const itemId = addResult.addProjectV2ItemById.item.id;

  console.log("GitHub 프로젝트 자동 동기화를 위해 2초간 대기합니다...");
  await new Promise((res) => setTimeout(res, 2000));

  const updateMutation = `
    mutation($projectId: ID!, $itemId: ID!, $startField: ID!, $endField: ID!, $startVal: Date!, $endVal: Date!, $statusField: ID!, $statusVal: String!) {
      start: updateProjectV2ItemFieldValue(input: { projectId: $projectId, itemId: $itemId, fieldId: $startField, value: { date: $startVal } }) { projectV2Item { id } }
      end: updateProjectV2ItemFieldValue(input: { projectId: $projectId, itemId: $itemId, fieldId: $endField, value: { date: $endVal } }) { projectV2Item { id } }
      status: updateProjectV2ItemFieldValue(input: { projectId: $projectId, itemId: $itemId, fieldId: $statusField, value: { singleSelectOptionId: $statusVal } }) { projectV2Item { id } }
    }
  `;

  await github.graphql(updateMutation, {
    projectId,
    itemId,
    startField: startDateFieldId,
    endField: endDateFieldId,
    startVal: startDate,
    endVal: endDate,
    statusField: statusFieldId,
    statusVal: statusOptionId,
  });
};

/**
 * 리뷰
 */
// PR에 리뷰어를 요청합니다.
export const requestReviewers = async ({
  github,
  context,
  pullNumber,
  reviewers,
}) => {
  if (!reviewers || reviewers.length === 0) return;

  await github.rest.pulls.requestReviewers({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pullNumber,
    reviewers: reviewers,
  });
};

// 리뷰어 배정을 대기하며 PR 정보를 가져옵니다.
export const waitForReviewers = async ({
  github,
  context,
  pullNumber,
  retries = 5,
  delay = 2000,
}) => {
  let pr;
  for (let i = 0; i < retries; i++) {
    const { data } = await github.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pullNumber,
    });

    pr = data;
    if (pr.requested_reviewers?.length > 0) {
      return pr;
    }

    console.log(`리뷰어 배정 대기 중... (${i + 1}/${retries})`);
    if (i < retries - 1)
      await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return pr;
};

/**
 * Discussion
 */
// Discussion 카테고리 목록 및 레포 ID 가져오기
export const getDiscussionCategory = async ({ github, context }) => {
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        id
        discussionCategories(first: 10) {
          nodes {
            id
            name
          }
        }
      }
    }
  `;
  const res = await github.graphql(query, {
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  return res.repository;
};

/**
 * 디스커션을 생성하고, 라벨이 있다면 라벨을 추가합니다.
 */
// export const createDiscussion = async ({
//   github,
//   repoId,
//   categoryId,
//   title,
//   body,
//   labelIds = [],
// }) => {
//   const createQuery = `
//     mutation($repoId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
//       createDiscussion(input: {
//         repositoryId: $repoId,
//         categoryId: $categoryId,
//         title: $title,
//         body: $body
//       }) {
//         discussion {
//           id
//           number
//         }
//       }
//     }
//   `;

//   const res = await github.graphql(createQuery, {
//     repoId,
//     categoryId,
//     title,
//     body,
//   });

//   const discussionId = res.createDiscussion.discussion.id;

//   if (labelIds.length > 0) {
//     const addLabelQuery = `
//       mutation($labelableId: ID!, $labelIds: [ID!]!) {
//         addLabelsToLabelable(input: {
//           labelableId: $labelableId,
//           labelIds: $labelIds
//         }) {
//           clientMutationId
//         }
//       }
//     `;

//     await github.graphql(addLabelQuery, {
//       labelableId: discussionId,
//       labelIds: labelIds,
//     });
//   }

//   return res.createDiscussion.discussion;
// };

// /**
//  * 레포지토리의 모든 라벨 목록을 가져옵니다.
//  */
// export const getRepoLabels = async ({ github, context }) => {
//   const query = `
//     query($owner: String!, $repo: String!) {
//       repository(owner: $owner, name: $repo) {
//         labels(first: 100) {
//           nodes { id name }
//         }
//       }
//     }
//   `;
//   const res = await github.graphql(query, {
//     owner: context.repo.owner,
//     repo: context.repo.repo,
//   });
//   return res.repository.labels.nodes;
// };

// /**
//  * 이름으로 라벨 ID를 찾습니다.
//  */
// export const findLabelIdByName = (labels, labelName) => {
//   const label = labels.find(
//     (l) => l.name.toLowerCase() === labelName.toLowerCase(),
//   );
//   return label ? label.id : null;
// };

//!

/**
 * 2. 디스커션을 생성만 합니다.
 */
export const createDiscussion = async ({
  github,
  repoId,
  categoryId,
  title,
  body,
}) => {
  const createQuery = `
    mutation($repoId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
      createDiscussion(input: {
        repositoryId: $repoId,
        categoryId: $categoryId,
        title: $title,
        body: $body
      }) {
        discussion {
          id
          number
        }
      }
    }
  `;

  const res = await github.graphql(createQuery, {
    repoId,
    categoryId,
    title,
    body,
  });

  return res.createDiscussion.discussion;
};

/**
 * 1. 이름으로 라벨을 찾아 대상(Node)에 추가합니다.
 * 목록 조회 + ID 매칭 + 부착을 한 번에 처리합니다.
 */
export const addLabelByName = async ({
  github,
  context,
  nodeId,
  labelName,
}) => {
  if (!labelName) return;

  // 레포지토리의 모든 라벨 목록 가져오기
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        labels(first: 100) {
          nodes { id name }
        }
      }
    }
  `;
  const res = await github.graphql(query, {
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  const labels = res.repository.labels.nodes;
  const targetLabel = labels.find(
    (l) => l.name.toLowerCase() === labelName.toLowerCase(),
  );

  if (!targetLabel) {
    console.log(`라벨을 찾을 수 없습니다: ${labelName}`);
    return;
  }

  // 라벨 부착
  const addMutation = `
    mutation($labelableId: ID!, $labelIds: [ID!]!) {
      addLabelsToLabelable(input: {
        labelableId: $labelableId,
        labelIds: $labelIds
      }) { clientMutationId }
    }
  `;

  await github.graphql(addMutation, {
    labelableId: nodeId,
    labelIds: [targetLabel.id],
  });
};
