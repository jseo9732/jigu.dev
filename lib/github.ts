import { siteConfig } from "./site-config";

type ContribDay = { contributionCount: number };
type ContribWeek = { contributionDays: ContribDay[] };

function toLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export async function getGithubContributions(): Promise<number[][] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                  }
                }
              }
            }
          }
        }`,
        variables: { login: siteConfig.github },
      }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const weeks: ContribWeek[] =
      json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if (!weeks) return null;

    return weeks.map((w) =>
      w.contributionDays.map((d) => toLevel(d.contributionCount))
    );
  } catch {
    return null;
  }
}
