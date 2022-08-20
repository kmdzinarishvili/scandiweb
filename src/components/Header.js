import '../styles/header.css'

// button1 and 2 are object with function, text, and id attributes
const Header = ({ pageName, button1, button2 }) => {


    return <div className='header'>
        <h2 className='title'>Project {pageName}</h2>
        <span className='buttons'>
            <button onClick={button1.function} id={button1.id} >{button1.text}</button>
            <button onClick={button2.function} id={button2.id}>{button2.text} </button>
        </span>
    </div>
}

export default Header;