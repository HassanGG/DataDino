import { Dataset, PostDataset, PatchDataset } from "common/data/dataset";

const baseUrl = "http://localhost:3000/datasets";

const response = (method: string, body: string) => {
  return {
    method,
    headers: {
      "Content-Type": "Application/json",
    },
    body
  }
}

export const DatasetService = class {
  async getAll(): Promise<Dataset[]> {
    const res = await fetch(baseUrl);
    if (!res.ok) console.log(res.statusText);
    const datasets = await res.json();

    return datasets as Dataset[];
  }

  async get(id: string): Promise<Dataset | undefined> {
    const url = `${baseUrl}/${id}`;
    const res = await fetch(url);
    if (!res.ok) console.log(res.statusText);
    const dataset = await res.json();

    return dataset as Dataset;
  }

  async post({ data }: { data: PostDataset }): Promise<string | undefined> {
    const body = JSON.stringify(data);
    const resBody = response("post", body)
    const res = await fetch(baseUrl, resBody);

    return res.statusText;
  }

  async patch({ data }: { data: PatchDataset }): Promise<string | undefined> {
    const body = JSON.stringify(data);
    const resBody = response("patch", body)
    const res = await fetch(baseUrl, resBody);

    return res.statusText;
  }
};
