export const IconWithText = ({ iconClass, text }: { iconClass: string, text: string }) => {
    return (
      <div className='flex gap-4'>
        <i className={iconClass}></i>
        <p>{text}</p>
      </div>
    );
  };