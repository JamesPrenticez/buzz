import React, { useState, useEffect, useRef, type ReactNode, type KeyboardEvent } from 'react'
import { twMerge } from 'tailwind-merge'

type Option = { label: string, value: string }

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>  {
  value: string; 
  options: Option[];
  onChange: (newValue: string) => void; 
  placeholder?: string;
  className: string;
  icon?: ReactNode;
}

export function Autocomplete({ 
  value,
  options,
  onChange,
  className,
  placeholder,
  icon,
  ...props
}: Props) {

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  const [isOpen, setIsOpen] = useState(false)

  const [filteredArray, setFilteredArray] = useState<Option[]>(options)
  const [activeIndex, setActiveIndex] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const filteredOptions = options?.filter((item) => filteredArray?.includes(item));

  const updateFilteredArray = (value: string) => {
    const filteredArr = options.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredArray(filteredArr);
  };

  // Quick fix - if there is no data on when component mounts
  useEffect(() => {
    setFilteredArray(options);
  }, [options]);

  const scrollIntoView = (direction: 'up' | 'down') => {
    switch (direction) {
      case 'up':
        let diffUp = activeIndex === 0 ? filteredArray.length - 1 : -1
        itemsRef.current[activeIndex + diffUp]?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' })
        break
      case 'down':
        let diffDown = activeIndex === filteredArray.length - 1 ? -activeIndex : 1
        itemsRef.current[activeIndex + diffDown]?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' })
        break
    }
  }

  const handleArrowKeys = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex(activeIndex === 0 ? filteredArray.length - 1 : activeIndex - 1) // If the index goes below 0, send to the bottom
        scrollIntoView('up')
        break
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex(activeIndex === filteredArray.length - 1 ? 0 : activeIndex + 1) // If the index goes above the length of the array, send to top
        scrollIntoView('down')
        break
      case 'Enter':
        e.preventDefault()
        onChange(filteredArray[activeIndex].value)
        setSearchValue('')
        setFilteredArray(options)
        setIsOpen(false)
        if (inputRef.current) {
          inputRef.current.blur()
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setSearchValue('')
        setFilteredArray(options)
        if (inputRef.current) {
          inputRef.current.blur()
        }
        break
    }
  }

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveIndex(0)
    setSearchValue(e.target.value)
    updateFilteredArray(e.target.value)
  }

  return (
    <div
      ref={containerRef}
      className={twMerge(`
        ${isOpen && 'ring-major'}
        ring-1
        ring-mist
        relative
        flex
        my-1
        w-full
        py-2
        rounded-lg
        outline-none
        h-[40px]
      `, className)}
    >
      {/* Icon */}
      {icon &&
        <div 
        className='w-[2rem] flex items-center justify-center pointer-events-none'
        >
          {icon}
        </div>
      }

      {/* Carret */}
      <div
        className='absolute w-[50px] right-0 inset-y-0 flex items-center justify-center cursor-pointer bg-transparent z-50'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(prev => !prev);
          // TODO - fix
          if(!inputRef.current) return;
          inputRef.current.focus();
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${
            isOpen ? '-rotate-90' : 'rotate-0'
          } 'transition transform ease-in-out duration-200`}
          height={20}
          width={20}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </div> 

      {/* Text Input / Search Box */}
      <input
        ref={inputRef}
        type='text'
        value={searchValue}
        className="
          absolute
          flex
          items-center
          w-[calc(100%)]
          h-full
          inset-x-0
          inset-y-0
          px-[12px]
          outline-none
          rounded-lg 
          bg-night 
          placeholder:text-mist
        "
        tabIndex={0}
        onClick={() => {
          setIsOpen(prev => !prev);
          // if(!inputRef.current) return;
          // isOpen ? inputRef.current.blur() : null;
        }}
        onBlur={(e) => { 
          // console.log(e);

          // TODO - explore click away listener here?
          // or remove click for input and button and move to wrapping container?
          //setIsOpen(false)
        }}
        onKeyDown={(e) => handleArrowKeys(e)}
        onChange={(e) => handleUpdate(e)}
        placeholder={
          searchValue?.length > 0
            ? ''
            : value?.length ?? 0 > 0
            ? value
            : placeholder || 'Select...'
        }
      />



      {options ? (
        <div 
          className={`${isOpen ? 'block' : 'hidden'} 
          absolute 
          top-[40px]
          right-0
          left-0
          bg-shadow
          text-mist
          cursor-pointer
          ring-1
          ring-mist
          rounded-lg
          max-h-[20rem]
          overflow-y-auto
          z-50
        `}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item, index) => {
              return (
                <div
                  key={index}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`flex justify-start items-center w-full px-4 py-2 cursor-pointer focus:outline-none ${
                    activeIndex === index
                      ? 'bg-tarantula text-white'
                      : 'text-mist'
                  }`}
                  onMouseMove={() => setActiveIndex(index)}
                  onMouseDown={() => {
                    onChange(filteredArray[activeIndex].value)
                    setSearchValue('')
                    setFilteredArray(options)
                    setIsOpen(false)
                  }}
                >
                  <span>{item.label}</span>
                </div>
              )
            })
          ) : (
            <div className='px-4 py-2'>No options found</div>
          )}
        </div>
      ) : null}
    </div>
  )
}