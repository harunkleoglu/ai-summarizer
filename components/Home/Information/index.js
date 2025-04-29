import InformationCard from "./InfoCard"

export default function Information() {
  return (
    <>
        <div className="flex flex-row justify-evenly p-3 gap-4">
            <InformationCard  title="Test-Title" isActionCard/>
            <InformationCard />
            <InformationCard />
        </div>
    </>
  )
}
