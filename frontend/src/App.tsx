import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

type Theme = 'theme1' | 'theme2' | 'theme3'
type BuildType = 'lean' | 'reg' | 'athletic' | 'big'

interface FormData {
  height: number
  weight: number
  build: BuildType
  text: string[]
}

interface TShirtDimensions {
  width: string
  height: string
  shoulderWidth: string
  sleeveLength: string
  collarWidth: string
}

function App() {
  const [theme, setTheme] = useState<Theme>('theme1')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [tshirtDimensions, setTshirtDimensions] = useState<TShirtDimensions>({
    width: '85%',
    height: '80%',
    shoulderWidth: '15%',
    sleeveLength: '25%',
    collarWidth: '30%'
  })
  
  const { register, handleSubmit, reset, control } = useForm<FormData>({
    defaultValues: {
      height: 180,
      weight: 80,
      build: 'athletic',
      text: ['', '', '']
    }
  })

  const watchedValues = useWatch<FormData>({
    control,
    defaultValue: {
      height: 180,
      weight: 80,
      build: 'athletic' as BuildType,
      text: ['', '', '']
    }
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewImage(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  })

  useEffect(() => {
    const handleThemeSwitch = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'q') {
        setTheme(current => {
          switch (current) {
            case 'theme1': return 'theme2'
            case 'theme2': return 'theme3'
            default: return 'theme1'
          }
        })
      }
    }

    window.addEventListener('keydown', handleThemeSwitch)
    return () => window.removeEventListener('keydown', handleThemeSwitch)
  }, [])

  const themeClasses = {
    theme1: {
      bg: 'bg-theme1-primary',
      text: 'text-white',
      border: 'border-theme1-accent',
      ring: 'focus:ring-theme1-accent',
      glow: 'theme1-glow',
      gradient: 'from-theme1-secondary to-theme1-primary',
    },
    theme2: {
      bg: 'bg-theme2-primary',
      text: 'text-white',
      border: 'border-theme2-accent',
      ring: 'focus:ring-theme2-accent',
      glow: 'theme2-glow',
      gradient: 'from-theme2-secondary to-theme2-primary',
    },
    theme3: {
      bg: 'bg-theme3-primary',
      text: 'text-white',
      border: 'border-theme3-accent',
      ring: 'focus:ring-theme3-accent',
      glow: 'theme3-glow',
      gradient: 'from-theme3-secondary to-theme3-primary',
    }
  }

  const calculateTShirtDimensions = (height: number, weight: number, build: BuildType): TShirtDimensions => {
    let width = '85%'
    let heightValue = '80%'
    let shoulderWidth = '15%'
    let sleeveLength = '25%'
    let collarWidth = '30%'
    
    if (weight > 90) {
      width = '95%'
      shoulderWidth = '20%'
    } else if (weight > 75) {
      width = '90%'
      shoulderWidth = '18%'
    } else if (weight < 65) {
      width = '80%'
      shoulderWidth = '13%'
    }
    
    if (height > 190) {
      heightValue = '85%'
      sleeveLength = '22%'
    } else if (height < 170) {
      heightValue = '75%'
      sleeveLength = '28%'
    }
    
    switch (build) {
      case 'big':
        width = parseInt(width) + 5 + '%'
        shoulderWidth = parseInt(shoulderWidth) + 5 + '%'
        collarWidth = '35%'
        break
      case 'athletic':
        shoulderWidth = parseInt(shoulderWidth) + 3 + '%'
        break
      case 'lean':
        width = parseInt(width) - 3 + '%'
        shoulderWidth = parseInt(shoulderWidth) - 2 + '%'
        collarWidth = '28%'
        break
      default:
        break
    }
    
    return {
      width,
      height: heightValue,
      shoulderWidth,
      sleeveLength,
      collarWidth
    }
  }

  const onSubmit = (data: FormData) => {
    const newDimensions = calculateTShirtDimensions(data.height, data.weight, data.build)
    setTshirtDimensions(newDimensions)
  }

  const resetForm = () => {
    reset({
      height: 180,
      weight: 80,
      build: 'athletic',
      text: ['', '', '']
    })
    setPreviewImage(null)
    setTshirtDimensions({
      width: '85%',
      height: '80%',
      shoulderWidth: '15%',
      sleeveLength: '25%',
      collarWidth: '30%'
    })
  }

  const getSizeRecommendation = (height: number, weight: number, build: BuildType): string => {
    if (build === 'big' || (build === 'athletic' && weight > 90)) return 'XL';
    if ((build === 'athletic' && weight > 75) || (build === 'reg' && weight > 85)) return 'L';
    if ((build === 'lean' && height > 180) || (build === 'reg' && weight > 70)) return 'M';
    return 'S';
  }

  const recommendedSize = getSizeRecommendation(
    watchedValues.height ?? 180,
    watchedValues.weight ?? 80,
    watchedValues.build ?? 'athletic'
  );

  return (
    <div className={clsx(
      'min-h-screen p-4 md:p-8 bg-dark-bg transition-colors duration-300'
    )}>
      <header className="mb-8">
        <h1 className={clsx(
          'text-3xl font-bold tracking-tight mb-2',
          themeClasses[theme].text
        )}>
          T-Shirt Designer
        </h1>
        <p className="text-dark-muted">Customize your perfect fit</p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <motion.div 
          className={clsx(
            "w-full md:w-[35%] bg-dark-card rounded-xl p-5 shadow-xl border border-dark-border overflow-hidden",
            theme && `shadow-glow ${themeClasses[theme].glow}`
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-dark-text">Preview</h2>
          
          <div className="aspect-[3/4] bg-dark-input rounded-md flex items-center justify-center mb-5 border border-dark-border relative overflow-hidden">
            <div className={clsx(
              "rounded-lg relative transition-all duration-500",
              themeClasses[theme].bg,
              "bg-opacity-30"
            )}
            style={{
              width: tshirtDimensions.width,
              height: tshirtDimensions.height
            }}>
              <div className="absolute bg-dark-input rounded-b-xl top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500"
                style={{ 
                  width: tshirtDimensions.collarWidth, 
                  height: '10%' 
                }}></div>
              
              <div className={clsx(
                "absolute rounded-l-lg transition-all duration-500",
                themeClasses[theme].bg,
                "bg-opacity-30"
              )}
              style={{ 
                width: tshirtDimensions.shoulderWidth, 
                height: tshirtDimensions.sleeveLength, 
                left: `-${tshirtDimensions.shoulderWidth}`, 
                top: '15%' 
              }}></div>
              
              <div className={clsx(
                "absolute rounded-r-lg transition-all duration-500", 
                themeClasses[theme].bg,
                "bg-opacity-30"
              )}
              style={{ 
                width: tshirtDimensions.shoulderWidth, 
                height: tshirtDimensions.sleeveLength, 
                right: `-${tshirtDimensions.shoulderWidth}`, 
                top: '15%' 
              }}></div>
              
              <div className="absolute w-[70%] h-[50%] top-[20%] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Custom design" 
                    className="max-w-full max-h-full object-contain mb-2"
                  />
                ) : (
                  <div className={clsx(
                    "w-16 h-16 mx-auto rounded-full my-2", 
                    themeClasses[theme].bg,
                    "opacity-60"
                  )}></div>
                )}
                
                <div className="text-center w-full mt-2">
                  {(watchedValues.text ?? ['', '', '']).map((line, index) => (
                    line && (
                      <p 
                        key={index} 
                        className="text-white font-semibold text-sm leading-tight"
                        style={{
                          textShadow: '0px 0px 2px rgba(0,0,0,0.5)'
                        }}
                      >
                        {line}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-2 right-2">
              <div className={clsx(
                "px-2 py-1 rounded-md text-xs font-bold",
                themeClasses[theme].bg
              )}>
                {recommendedSize}
              </div>
            </div>
          </div>
          
          <div className="mb-4 p-3 bg-dark-bg rounded-lg border border-dark-border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-dark-text">Your Measurements</h3>
              <div className={clsx(
                "px-2 py-0.5 text-xs font-bold rounded",
                themeClasses[theme].bg
              )}>
                Size: {recommendedSize}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex flex-col items-center">
                <span className="text-dark-muted text-xs">Height</span>
                <span className="text-dark-text">{watchedValues.height} cm</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-dark-muted text-xs">Weight</span>
                <span className="text-dark-text">{watchedValues.weight} kg</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-dark-muted text-xs">Build</span>
                <span className="text-dark-text capitalize">{watchedValues.build}</span>
              </div>
            </div>
          </div>

          <div 
            {...getRootProps()} 
            className={clsx(
              'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200',
              isDragActive 
                ? `${themeClasses[theme].border} bg-opacity-10 ${themeClasses[theme].bg}` 
                : 'border-dark-border hover:border-opacity-70'
            )}
          >
            <input {...getInputProps()} />
            <ArrowUpTrayIcon className={clsx(
              "w-8 h-8 mx-auto mb-3",
              isDragActive ? themeClasses[theme].text : "text-dark-muted"
            )} />
            <p className={clsx(
              "text-sm",
              isDragActive ? themeClasses[theme].text : "text-dark-muted"
            )}>
              Drop an image here, or click to select
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 bg-dark-card rounded-xl p-6 shadow-xl border border-dark-border"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-dark-text">Customize Design</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-text">
                  Height (cm)
                </label>
                <input
                  type="number"
                  {...register('height')}
                  className={clsx(
                    "input-field",
                    themeClasses[theme].ring
                  )}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-text">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  {...register('weight')}
                  className={clsx(
                    "input-field",
                    themeClasses[theme].ring
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-text">
                Build
              </label>
              <select
                {...register('build')}
                className={clsx(
                  "input-field",
                  themeClasses[theme].ring
                )}
              >
                <option value="lean">Lean</option>
                <option value="reg">Regular</option>
                <option value="athletic">Athletic</option>
                <option value="big">Big</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-dark-text">
                  Custom Text (up to 3 lines)
                </label>
                <div className="text-dark-muted inline-flex items-center text-xs">
                  <InformationCircleIcon className="w-4 h-4 mr-1" />
                  <span>Text will appear on the shirt</span>
                </div>
              </div>
              
              {[0, 1, 2].map((index) => (
                <input
                  key={index}
                  type="text"
                  {...register(`text.${index}`)}
                  placeholder={`Line ${index + 1}`}
                  className={clsx(
                    "input-field",
                    themeClasses[theme].ring
                  )}
                  maxLength={20}
                />
              ))}
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-dark-muted">
                  Press <kbd className="px-2 py-1 bg-dark-input rounded border border-dark-border">Alt + Q</kbd> to switch themes
                </p>
                <div className="flex space-x-2">
                  {(['theme1', 'theme2', 'theme3'] as Theme[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      className={clsx(
                        "w-6 h-6 rounded-full transition-transform",
                        themeClasses[t].bg,
                        theme === t ? "scale-125 ring-2 ring-white" : "opacity-60 hover:opacity-100"
                      )}
                      aria-label={`Switch to ${t}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className={clsx(
                    'flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300',
                    'bg-dark-input text-dark-muted border border-dark-border',
                    'hover:bg-opacity-80 active:scale-[0.98]'
                  )}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className={clsx(
                    'flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300',
                    'bg-gradient-to-r shadow-md hover:shadow-lg active:scale-[0.98]',
                    themeClasses[theme].gradient,
                    themeClasses[theme].text
                  )}
                >
                  Update Design
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default App