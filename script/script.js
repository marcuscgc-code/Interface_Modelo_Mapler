document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("header").innerHTML = `
        <header class="header">
            <div class="container d-flex justify-content-between align-items-center py-3">
                <h1 class="logo">MAPLER</h1>
                <nav>
                    <ul class="nav">
                        <li class="nav-item"><a class="nav-link" href="#">Portugol</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Fluxograma</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Desenvolvimento</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Ajuda</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Exercícios</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `;

    document.getElementById("footer").innerHTML = `
        <footer class="footer text-center py-4">
            <div class="container">
                <p>© 2025 Mapler Portugol</p>
                <nav>
                    <a href="#">Sobre</a> | <a href="#">Home</a> | <a href="#">Comunidade</a> | <a href="#">Documentação</a>
                </nav>
            </div>
        </footer>
    `;
});
