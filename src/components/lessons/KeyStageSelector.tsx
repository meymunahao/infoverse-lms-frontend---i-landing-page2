import clsx from 'clsx';

interface KeyStageSelectorProps {
  selectedKeyStage: number;
  onSelect: (keyStage: number) => void;
}

export function KeyStageSelector({
  selectedKeyStage,
  onSelect,
}: KeyStageSelectorProps) {
  const keyStages = [1, 2, 3, 4];

  return (
    <div className="flex gap-3">
      {keyStages.map((ks) => (
        <button
          key={ks}
          onClick={() => onSelect(ks)}
          className={clsx(
            'px-6 py-3 rounded-lg font-semibold transition-all',
            {
              'bg-primary text-white': selectedKeyStage === ks,
              'bg-[#BDD0D2] text-black hover:bg-[#A8BFC1]':
                selectedKeyStage !== ks,
            }
          )}
        >
          Key Stage {ks}
        </button>
      ))}
    </div>
  );
}
