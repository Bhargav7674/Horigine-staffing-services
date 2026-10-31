export type JobApiItem = {
  id?: string | number;
  uuid?: string;
  title?: string;
  name?: string;
  department?: string;
  team?: string;
  category?: string;
  location?: string;
  job_type?: string;
  type?: string;
  employment_type?: string;
  salary?: string | number | null;
  compensation?: string | number | null;
  level?: string;
  seniority?: string;
  experience?: string;
  description?: string;
  summary?: string;
  responsibilities?: string[] | string | null;
  requirements?: string[] | string | null;
  tags?: string[] | string | null;
  skills?: string[] | string | null;
  keywords?: string[] | string | null;
  badge?: string | null;
  status?: string | null;
};

export type JobListParams = {
  search?: string;
  location?: string;
  job_type?: string;
  limit?: number;
  skip?: number;
};

export type JobListResponse = {
  items?: JobApiItem[];
  jobs?: JobApiItem[];
  data?: JobApiItem[];
  results?: JobApiItem[];
  total?: number;
  count?: number;
};

export function normalizeJobListPayload(payload: JobListResponse | null | undefined): JobApiItem[] {
  if (!payload) return [];

  const list =
    payload.items ??
    payload.jobs ??
    payload.data ??
    payload.results ??
    [];

  return Array.isArray(list) ? list : [];
}

function toStringArray(value: string[] | string | null | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return value
    .split(/[\n,|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function fetchJobs(params: JobListParams = {}): Promise<JobApiItem[]> {
  const query = new URLSearchParams();

  if (params.search) query.set("search", params.search);
  if (params.location) query.set("location", params.location);
  if (params.job_type) query.set("job_type", params.job_type);
  if (params.limit) query.set("limit", String(params.limit));
  if (params.skip) query.set("skip", String(params.skip));

  const url = `/api/v1/jobs${query.toString() ? `?${query.toString()}` : ""}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json().catch(() => null);

    if (response.status >= 200 && response.status < 300) {
      return normalizeJobListPayload(data);
    }

    const details = Array.isArray(data?.detail) ? data.detail : [];
    const message =
      details
        .map((item: { msg?: string }) => item?.msg || "Unable to load jobs.")
        .join(". ") ||
      (typeof data?.message === "string" ? data.message : "Unable to load jobs.");

    throw new Error(message || `Request failed with status ${response.status}`);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unable to load jobs right now. Please try again later.");
  }
}

export function normalizeJobForCareerCard(job: JobApiItem) {
  const title = job.title ?? job.name ?? "Open Position";
  const department = job.department ?? job.team ?? job.category ?? "General";
  const location = job.location ?? "Remote";
  const type = job.job_type ?? job.type ?? job.employment_type ?? "Full-time";
  const salary =
    job.salary ?? job.compensation ?? "Competitive compensation";
  const level = job.level ?? job.seniority ?? job.experience ?? "Mid-level";
  const description = job.description ?? job.summary ?? "Join our team and help deliver high-impact work.";
  const tags = toStringArray(job.tags ?? job.skills ?? job.keywords ?? []);
  const responsibilities = toStringArray(job.responsibilities ?? []);
  const requirements = toStringArray(job.requirements ?? []);
  const badgeValue = (job.badge ?? job.status ?? "").toString().toUpperCase();
  const badge: "HOT" | "NEW" | undefined =
    badgeValue === "HOT"
      ? "HOT"
      : badgeValue === "NEW"
        ? "NEW"
        : undefined;

  return {
    id: job.id ?? job.uuid ?? title,
    department,
    title,
    location,
    type,
    salary: String(salary),
    level,
    description,
    tags: tags.length ? tags : ["Teamwork", "Delivery"],
    responsibilities: responsibilities.length ? responsibilities : [description],
    requirements: requirements.length ? requirements : ["Strong communication and collaboration skills."],
    badge,
  };
}
