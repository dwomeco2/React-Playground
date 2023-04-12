type TagLabelProps = {
	labels: readonly string[];
};

const labelColors = [
	'bg-[var(--colar-red-5)]',
	'bg-[var(--colar-pink-5)]',
	'bg-[var(--colar-violet-5)]',
	'bg-[var(--colar-indigo-5)]',
	'bg-[var(--colar-cyan-5)]',
	'bg-[var(--colar-green-5)]',
	'bg-[var(--colar-lime-5)]',
	'bg-[var(--colar-yellow-5)]',
	'bg-[var(--colar-choco-5)]',
	'bg-[var(--colar-sand-5)]',
];

export default function TagLabel(props: TagLabelProps) {
	const {labels} = props;
	return (
		<div className='flex justify-center items-center flex-wrap gap-2 mb-2'>
			{labels.map((label, index) => {
				const colorClass = labelColors[index % labelColors.length];
				return (
					<span key={label} className={`${colorClass} py-1 px-2 rounded-full text-xs`}>
						#{label}
					</span>
				);
			})}
		</div>
	);
}
