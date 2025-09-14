"use client"

interface ViewUserButtonProps {
     userId: number
}
//mendeklarasikan bentuk interface dari komponenya harus ada apa REACT.fc Berarti functional component
const ViewUserButton:  React.FC<ViewUserButtonProps>= ({userId}) => {
   const handleClick = () => alert(`user id: ${userId}`)
    return (
         <button onClick={handleClick}>lihat user</button>
    )
} 
export default ViewUserButton