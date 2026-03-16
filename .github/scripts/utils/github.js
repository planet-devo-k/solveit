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
  const { data: pullRequests } = await github.rest.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: "all",
    sort: "created",
    direction: "desc",
  });

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
    name: context.repo.repo,
  });
  return res.repository;
};

/**
 * Discussion 제목으로 기존 Discussion을 검색하고, ID와 본문(body)을 반환합니다.
 */
export const findSessionDiscussion = async ({ github, context, title }) => {
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        discussions(first: 50) {
          nodes {
            id
            title
            body
          }
        }
      }
    }
  `;
  const res = await github.graphql(query, {
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  // 제목이 정확히 일치하는 Discussion을 찾습니다.
  return res.repository.discussions.nodes.find((d) => d.title === title);
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
 * 기존 Discussion의 내용을 업데이트합니다.
 */
export const updateDiscussion = async ({ github, discussionId, body }) => {
  const mutation = `
    mutation($id: ID!, $body: String!) {
      updateDiscussion(input: {discussionId: $id, body: $body}) {
        discussion {
          id
        }
      }
    }
  `;
  return await github.graphql(mutation, {
    id: discussionId,
    body,
  });
};
