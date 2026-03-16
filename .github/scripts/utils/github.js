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
 * 새로운 Discussion을 생성합니다.
 */
export const createDiscussion = async ({
  github,
  repoId,
  categoryId,
  title,
  body,
}) => {
  const mutation = `
    mutation($repoId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
      createDiscussion(input: {repositoryId: $repoId, categoryId: $categoryId, title: $title, body: $body}) {
        discussion {
          id
          body
        }
      }
    }
  `;
  const res = await github.graphql(mutation, {
    repoId,
    categoryId,
    title,
    body,
  });
  return res.createDiscussion.discussion;
};

/**
 * 프로젝트에 아이템을 추가하고 날짜 필드를 설정합니다.
 */
export const addToProjectAndSetDates = async ({
  github,
  projectId,
  contentId,
  startDateFieldId,
  endDateFieldId,
  startDate,
  endDate,
}) => {
  if (!projectId || !startDateFieldId || !endDateFieldId) {
    console.log("프로젝트 설정이 누락되어 연결을 건너뜁니다.");
    return;
  }

  // 1. 프로젝트 아이템 추가
  const addMutation = `
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) { item { id } }
    }
  `;
  const addResult = await github.graphql(addMutation, { projectId, contentId });
  const itemId = addResult.addProjectV2ItemById.item.id;

  // 2. 날짜 업데이트
  const updateMutation = `
    mutation($projectId: ID!, $itemId: ID!, $startField: ID!, $endField: ID!, $startVal: Date!, $endVal: Date!) {
      start: updateProjectV2ItemFieldValue(input: { projectId: $projectId, itemId: $itemId, fieldId: $startField, value: { date: $startVal } }) { projectV2Item { id } }
      end: updateProjectV2ItemFieldValue(input: { projectId: $projectId, itemId: $itemId, fieldId: $endField, value: { date: $endVal } }) { projectV2Item { id } }
    }
  `;

  await github.graphql(updateMutation, {
    projectId,
    itemId,
    startField: startDateFieldId,
    endField: endDateFieldId,
    startVal: startDate,
    endVal: endDate,
  });

  return itemId;
};
