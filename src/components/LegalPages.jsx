
const LegalPages = ({ title, lastUpdate, sections }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display gradient-text text-4xl font-bold leading-tight">{title}</h1>
        <p className="text-sm text-zinc-400 font-semibold mb-10">{lastUpdate}</p>
        <div>
            {sections.map((section) => (
            <div key={section.title}
            className="py-4">
                <h2 className="font-display text-2xl font-bold">{section.title}</h2>
                <p className="text-base py-1 leading-relaxed">{section.content}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default LegalPages