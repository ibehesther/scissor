import styles from "@app/page.module.css";
import Image from "next/image";
const Header = () => {
	return (
		<nav className={styles.navbar}>
			<a href="/">
				{" "}
				<Image src="/scissor.png" alt="scissor_logo" width={36} height={36} /> 
				<h1>Scissor</h1>
			</a>
		</nav>
	);
};

export default Header;
