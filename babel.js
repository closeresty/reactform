const { useState } = React
const { useForm } = ReactHookForm

const formStyle = "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
const inputStyle = "bg-white h-12 w-full px-5 pr-10 mt-5 rounded-full text-sm border-2 border-solid border-gray-300 focus:outline-none"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { reset, register, formState: { errors }, handleSubmit } = useForm()
  
  const ErrorMsg = ({ inputName }) => (
    <>
      {errors[inputName] && (
        <small className="text-sm text-red-400 font-medium block mt-1 px-4">
          {
            errors[inputName]['message'] ?
            errors[inputName]['message'] :
            errors[inputName]['type'] === 'allowed' ?
            `invalid username` :
            `${inputName} is required`
          }
        </small>
      )}
    </>
  )
  
  const validateUsername = async (value) => {
      await sleep(1000);
      return value !== "admin";
  }

  const onSubmit = data => {
    setIsSubmitted(true)
    reset()
  }
  
  if (isSubmitted)
    return (
      <div className="w-full md:w-1/2 xl:w-1/3 container mx-auto pt-4 md:pb-1 rounded-md">
        <div className={`${formStyle} items-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="#10B981">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 class="text-3xl my-6 title">Data Sent</h4>
          <button
            className="text-indigo-500"
            onClick={e => setIsSubmitted(false)}
          >
            Back to Form
          </button>
          <a 
             href="https://react-hook-form.com/get-started"
             className="text-gray border-2 border-solid border-gray-600 px-6 py-1 rounded mt-3"
              target="_blank"
           >
            Visit React Hook Form
          </a>
        </div>
      </div>
    )
  
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 container mx-auto pt-4 md:pb-1  rounded-md">
      <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <h1 class="title text-4xl text-center">Foodie</h1>
        <h3
          className="text-sm text-center px-4 my-3"
        >
          Add your restaurant to our list
        </h3>

        <input 
          {...register("username", { 
              required: true, 
              validate: {
                allowed: validateUsername
              } 
          })} 
          className={inputStyle}
          placeholder="Username"
         />
         <ErrorMsg inputName="username" />

        <input 
          className={inputStyle}
          placeholder="Name" 
          {...register("name", { required: true })} 
        />
        <ErrorMsg inputName="name" />

        <input
          className={inputStyle}
          placeholder="Email" 
          {...register("email", { required: true })} 
        />
        <ErrorMsg inputName="email" />

        <input 
          className={inputStyle}
          placeholder="Phone" 
          {...register("phone", { 
            required: true,
            maxLength: { value: 13, message: "Max length 13" }
          })} 
        />
        <ErrorMsg inputName="phone" />

        <input 
          className={inputStyle}
          placeholder="Schedule" 
          {...register("schedule", { required: true })} 
        />
        <ErrorMsg inputName="schedule" />

        <input 
          className={inputStyle}
          placeholder="Tags" 
          {...register("tags")} 
        />

        <input 
          type="submit"
          className="w-full text-md px-5 py-2 my-4 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
        />
      </form>
   </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById("root")
)