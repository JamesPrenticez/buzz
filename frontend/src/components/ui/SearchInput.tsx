import React, { type FC, type ChangeEvent } from 'react';

interface SearchInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className="text-md relative rounded-md w-full p-2 ring-inset ring-1 ring-theme-tertiary focus:ring-theme-quaternary "
    >
      <label htmlFor={label} className="sr-only">
        {label}
      </label>

      <div className="absolute inset-y-0 pl-2 flex items-center pointer-events-none">
        <SearchIcon height={20} width={20} />
      </div>

      <input
        type="text"
        placeholder={placeholder}
        className={`font-redhat bg-transparent outline-none w-full placeholder-gray1 text-md pl-8 ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

interface IconProps {
  className?: string;
  height: string | number;
  width: string | number;
  onClick?: () => void
}

const SearchIcon = ({className, height, width, onClick}: IconProps) => {
  return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} height={height} width={width} onClick={onClick} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
		</svg>
  )
}



