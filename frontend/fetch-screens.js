import fs from 'fs';

const screens = [
  { name: "AcademicHub", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzhmZjM1MjgwMDkyZjRiZjg4NjcwZWViYjUwNDM1YjRmEgsSBxD5renC9wIYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDYzNTYzMjE4ODY0NjM2NDI3&filename=&opi=89354086" },
  { name: "AdminDashboard", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2IwYTMzMTU5MzRjODQ3Mjc4YWE1MzJkYmVjODNhYTEyEgsSBxD5renC9wIYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDYzNTYzMjE4ODY0NjM2NDI3&filename=&opi=89354086" },
  { name: "StaffDirectory", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2E5OWRjMWZiZDRjMDQ4YTFiYzlmNTc5Y2JkMTQ2MjdiEgsSBxD5renC9wIYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDYzNTYzMjE4ODY0NjM2NDI3&filename=&opi=89354086" },
  { name: "StudentDirectory", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzc4MzFiZmQyZmI4ODQxOTZiYWY2YzIyZDUxOGZlYTIwEgsSBxD5renC9wIYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDYzNTYzMjE4ODY0NjM2NDI3&filename=&opi=89354086" },
  { name: "DetailedStudentProfile", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzJmNTZhMDc4YmI5NzQyMGI4OWUyYjMxZmFjNTA4MzAzEgsSBxD5renC9wIYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDYzNTYzMjE4ODY0NjM2NDI3&filename=&opi=89354086" },
  { name: "ParentStudentPortal", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNmZTg0NTVhNjYzNjQ3MTViMWE0Y2Y5MjYwZGE0ZTQ1EgsSBxD5renC9wIYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDYzNTYzMjE4ODY0NjM2NDI3&filename=&opi=89354086" },
  { name: "FeeManagement", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzhjMDRjODMyYzNkMjRkNWViMTJhM2ZiNmU0OGE3MzQ1EgsSBxD5renC9wIYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDYzNTYzMjE4ODY0NjM2NDI3&filename=&opi=89354086" }
];

async function fetchScreens() {
  if (!fs.existsSync('src/raw-screens')) {
    fs.mkdirSync('src/raw-screens');
  }

  for (const screen of screens) {
    console.log(`Fetching ${screen.name}...`);
    const res = await fetch(screen.url);
    const html = await res.text();
    fs.writeFileSync(`src/raw-screens/${screen.name}.html`, html);
  }
}

fetchScreens();
