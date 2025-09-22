# Corae - Aplicativo de Delivery de Comida

O Corae é um aplicativo móvel para delivery de comida, construído com React Native e Expo. Ele permite que os usuários naveguem por restaurantes, peçam comida e gerenciem seus detalhes de entrega.

**Observação:** Este é um projeto de estudo desenvolvido para fins acadêmicos.

## 🚀 Começando

Para obter uma cópia local e executá-la, siga estes passos simples.

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina. Você também precisará do aplicativo Expo Go em seu dispositivo móvel ou um emulador de Android/iOS configurado em seu computador.

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/corae.git
    ```
2.  Instale os pacotes NPM:
    ```bash
    npm install
    ```

### Executando a Aplicação

1.  Inicie o Metro bundler:
    ```bash
    npx expo start
    ```
2.  Siga as instruções no terminal para abrir o aplicativo:
    *   Escaneie o QR code com o aplicativo Expo Go em seu celular.
    *   Ou, execute em um emulador Android ou simulador iOS.

## ✨ Principais Funcionalidades

-   **Autenticação de Usuário:** Funcionalidade de cadastro e login seguros.
-   **Listagem de Restaurantes:** Navegue por uma lista de restaurantes disponíveis.
-   **Navegação de Cardápios:** Veja os menus e detalhes de cada item de comida.
-   **Carrinho de Compras:** Adicione e gerencie itens no carrinho.
-   **Processo de Checkout:** Faça pedidos com endereços e métodos de pagamento salvos.
-   **Histórico de Pedidos:** Veja os pedidos anteriores e seus status.
-   **Favoritos:** Marque restaurantes e itens de comida favoritos para acesso rápido.
-   **Funcionalidade de Busca:** Encontre restaurantes e itens de comida facilmente.
-   **Gerenciamento de Perfil:** Atualize informações do usuário, endereços e detalhes de pagamento.

## 🛠️ Tecnologias Utilizadas

-   **[React Native](https://reactnative.dev/):** Um framework para construir aplicativos móveis nativos usando React.
-   **[Expo](https://expo.dev/):** Uma plataforma e conjunto de ferramentas para construir e implantar aplicativos React Native.
-   **[TypeScript](https://www.typescriptlang.org/):** Um superset tipado de JavaScript que compila para JavaScript puro.
-   **[Tailwind CSS (NativeWind)](https://www.nativewind.dev/):** Um framework CSS utility-first para construir designs personalizados rapidamente.
-   **[Expo Router](https://docs.expo.dev/router/introduction/):** Um roteador baseado em arquivos para aplicativos React Native e web.
-   **[Expo Splash Screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/):** Para uma experiência de tela de abertura personalizável.

## 📂 Estrutura do Projeto

O código-fonte do projeto está organizado no diretório `src/`, com uma estrutura que separa as responsabilidades e promove a modularidade.

```
src/
├── app/                # Rotas e telas da aplicação (usando Expo Router)
├── assets/             # Imagens, fontes e outros recursos estáticos
├── components/         # Componentes de UI reutilizáveis
├── contexts/           # Contextos React para gerenciamento de estado (ex: CartContext)
└── styles/             # Estilos globais e configurações
```

---

Este README fornece uma visão geral abrangente do aplicativo Corae. Para informações mais detalhadas sobre partes específicas do código, consulte o código-fonte e os comentários.
