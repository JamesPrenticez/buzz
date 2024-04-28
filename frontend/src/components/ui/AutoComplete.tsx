import React, { useState, useEffect, useRef, type ReactNode } from 'react'

type Option = { label: string, value: string }

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>  {
  value: string; 
  options: Option[];
  onChange: (newValue: string) => void; 
  placeholder?: string;
  renderIcon?: ReactNode;
}

export function Autocomplete({ 
  value,
  options,
  onChange,
  placeholder,
  renderIcon,
  ...props
}: Props) {

  let icon = null //renderIcon()

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

  const handleArrowKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <>
      <div
        ref={containerRef}
        className={`${isOpen && 'ring-blue-500'} focus:ring-red-500 ring-1 ring-blue-500 relative flex my-1 w-full py-2 cursor-pointer rounded-sm outline-none h-[40px]`}
      >
        {/* Icon */}
        {icon &&
          <div 
          className='w-[2rem] flex items-center justify-center pointer-events-none'
          >
            {icon}
          </div>
        }

        {/* Text Input / Search Box */}
        <input
          ref={inputRef}
          type='text'
          value={searchValue}
          className='absolute flex items-center w-full h-full inset-x-0 inset-y-0 px-[12px] outline-none ring-purple-500 bg-transparent placeholder:text-theme-secondary z-50'
					tabIndex={0}
					onClick={() => {setIsOpen(!isOpen), isOpen ? inputRef.current!.blur() : null}}
					onBlur={() => setIsOpen(false)}
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

        {/* Carret */}
        <div
          className='absolute w-[2rem] right-0 inset-y-0 flex items-center justify-center'
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

        {options ? (
          <div 
            className={`${isOpen ? 'block' : 'hidden'} absolute top-10 right-0 left-0 bg-green-500 text-theme-secondary cursor-pointer ring-1 ring-blue-500 rounded-sm max-h-[20rem] overflow-y-scroll z-50`}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => {
                return (
                  <div
                    key={index}
                    ref={(el) => (itemsRef.current[index] = el)}
                    className={`flex justify-start items-center w-full px-4 py-2 cursor-pointer focus:outline-none ${
                      activeIndex === index
                        ? 'bg-blue-500 text-white'
                        : 'text-black'
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
    </>
  )
}