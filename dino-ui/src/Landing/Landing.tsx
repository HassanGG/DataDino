import Label from "common/components/label"
import { Navbar } from "navbar/Navbar"
import DatasetCard from "common/components/dataset-card"

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
    <Navbar large />
    <DatasetCard dataset={dataset} />
    <Label h1 text="Landing Page" />
  </>
}