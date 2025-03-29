function Die(props) {

  const classToggle = props.isHeld ? 'dice-held' : 'dice-default'
  

  return (
    <button 
      id={props.id}
      className={classToggle} 
      onClick={props.handleClick}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value},
      ${props.isHeld ? "held" : "not held"}`}
    >
      
      {props.value}

    </button>
  );
}
  
export default Die;