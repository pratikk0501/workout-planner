function Layout(props) {
  const { children } = props;

  const header = (
    <header>
      <h1 className="text-gradient">The Shredstack</h1>
      <p>
        <strong>The 30 Simple Workouts Program</strong>
      </p>
    </header>
  );

  const footer = (
    <footer>
      <p>
        Built by{" "}
        <a href="https://github.com/pratikk0501" target="_blank">
          Pratik
        </a>
        <br />
        Made with custom CSS styles
      </p>
    </footer>
  );

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}

export default Layout;
