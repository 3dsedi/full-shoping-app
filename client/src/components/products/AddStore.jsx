import React,{useRef} from 'react'

export const AddStore = ({addStore}) => {
    const storeNameRef = useRef()

    const storeSubmitHandler = (event) => {
        event.preventDefault();
        const newStore = {
            name : storeNameRef.current?.value
        }
        addStore(newStore)
    }
  return (
    <div>
           <h3>Create new store</h3>
        <form onSubmit={storeSubmitHandler} className={"create_user_form"}>
          <label htmlFor="store_name_input">name</label>
          <input placeholder={"store_name"} id={"store_name_input"} ref={storeNameRef}/>
          <br/>
          <button className="submit" >Add</button>
          </form>
    </div>
  )
}
