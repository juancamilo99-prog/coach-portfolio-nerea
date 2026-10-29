
const LegalPages = ({ title, lastUpdate, sections }) => {
  return (
    <div>
        <h1>{title}</h1>
        <p>{lastUpdate}</p>
        <div>
            {sections.map((section) => (
            <div key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.content}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default LegalPages