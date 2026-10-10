function solution(id_list, report, k) {
  const reportRecord = new Map(id_list.map((id) => [id, new Set()]));

  for (const entry of report) {
    const [reporter, reported] = entry.split(" ");
    reportRecord.get(reported).add(reporter);
  }

  const mailCount = new Map(id_list.map((id) => [id, 0]));

  for (const [reported, reporters] of reportRecord) {
    if (reporters.size >= k) {
      for (const reporter of reporters) {
        mailCount.set(reporter, mailCount.get(reporter) + 1);
      }
    }
  }

  return id_list.map((id) => mailCount.get(id));
}
