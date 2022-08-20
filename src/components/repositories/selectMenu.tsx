const SelectMenu = (props: { button: string, items: { value: string, name: string }[], callBack: Function }) => {
	return (
		<details id={props.button} className="details">
			<summary className="summary" onClick={()=>{
				document.querySelectorAll(".details")?.forEach((e:any)=>{
					return e.id !== props.button?e.removeAttribute("open"):"";
			})}}>
				{props.button}
				<span className="dropDownCaret"></span>
			</summary>
			<div className="selectMenu">
				<div className="selectMenuModal">
					<header className="selectMenu-header"><span >Select {props.button}</span><span className="selectMenuDismiss"
						onClick={() => { document.getElementById(props.button)?.removeAttribute("open"); }}
					><svg aria-label="Close menu" aria-hidden="false" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-x">
							<path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
						</svg></span></header>
					<div className="selectMenu-list">
						{
							props.items.map((item: { value: string, name: string }) => {
								return <span className="selectMenu-item" key={item.value}
									onClick={() => {
										document.getElementById(props.button)?.removeAttribute("open");
										props.callBack(item.value)
									}}
								>{item.name ? item.name : "Undefined language"}
								</span>
							})
						}
					</div>
				</div>
			</div>
		</details>
	)
};

export default SelectMenu;