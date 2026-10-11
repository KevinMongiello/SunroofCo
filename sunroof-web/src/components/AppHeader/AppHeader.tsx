import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import "./AppHeader.css";

interface AppHeaderProps {
  buttonConfigs?: { label: string; onClick: () => void; disabled?: boolean }[];
  h1Text?: string;
  h2Text?: string;
  navBack?: () => void;
  children?: ReactNode;
  scale?: 'sm' | 'md' | 'lg';
  classNames?: string;
}

export const AppHeader = ({
  h1Text,
  h2Text,
  buttonConfigs = [],
  navBack,
  children,
  scale = 'lg',
  classNames
}: AppHeaderProps) => {
  const navBackNode = !!navBack ? (
    <>
      <button
        type="button"
        className="button button--ghost button--icon"
        onClick={() => navBack()}
      >
        <ArrowLeft size={32} />
      </button>
    </>
  ) : null;
  return (
    <header className={`app-header app-header--${scale} ${classNames ?? ''}`}>
      <div className="header-left">
        {navBackNode}
        <div className="header-body">
          {h1Text ? <h1>{h1Text}</h1> : null}
          {h2Text ? <h2>{h2Text}</h2> : null}
        </div>
      </div>
      {children}
      {buttonConfigs?.length > 0 ? (
        <div>
          {buttonConfigs.map((config) => (
            <button
              key={config.label}
              className="button button--primary"
              onClick={config.onClick}
              disabled={config.disabled}
            >
              {config.label}
            </button>
          ))}
        </div>
      ) : null}
    </header>
  );
};
