import Label from 'common/components/label'

export const NavbarItem = ({ text, link }: { text: string, link: string }) => {
	return <>
		<a className='nav-link text-dark' href={link}>
			<Label h6 bold text={text} />
		</a>
	</>
}
