import Label from "common/components/label"
import DatasetCard from "common/components/dataset-card"
import Page from "common/components/page"

export const Landing = () => {
  const dataset = {
    id: "1234",
    name: "Pickle sizes",
    description: "hello hellohellohello hello hello hello hellohellohello hello hello hello hellohello",
    datapointPrice: 4,
    datapointCount: 200000,
    uploadedAt: Date.now().toLocaleString(),
    archived: false
  }
  return <>
    <Page largeNavbar>
      <DatasetCard dataset={dataset} />
    </Page>
  </>
}