interface AppHeaderProps {
  buttonConfigs?: { label: string; onClick: () => void }[];
  h1: string;
  h2: string;
}

export const AppHeader = ({ h1, h2, buttonConfigs = [] }: AppHeaderProps) => {
  return (
    <header>
      <div className="header-body">
        <h1>{h1}</h1>
        <h2>{h2}</h2>
      </div>
      {buttonConfigs?.length > 0 ? (
        <div>
          {buttonConfigs.map((config) => (
            <button key={config.label} className='primary' onClick={config.onClick}>{config.label}</button>
          ))}
        </div>
      ) : null}
    </header>
  );
};
