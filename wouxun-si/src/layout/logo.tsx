import { component$, useStylesScoped$ } from '@builder.io/qwik';

export const Logo = component$(() => {
  useStylesScoped$(`svg {
    width: 207px;
    height: auto;
  }`);
  return (
    <svg
      width="946"
      height="220"
      viewBox="0 0 946 220"
      alt="Wouxun Slovenija"
      text="Wouxun Slovenija"
    >
      <path
        d="M96.775 201.499c-37.723-7.586-65.445-37.806-69.31-75.555-2.312-22.576 4.024-44.281 18.207-62.373 7.141-9.11 8.99-10.852 18.239-17.183 14.487-9.919 31.53-15.454 47.515-15.431 11.193.015 25.271 2.74 34.01 6.58 11.178 4.915 11.07 4.432 2.43 10.936l-7.592 5.714-4.25-1.19c-16.563-4.635-27.004-5.185-39.204-2.065-14.318 3.662-26.548 11.166-35.872 22.012-6.253 7.272-9.302 12.734-12.84 23-2.554 7.412-2.936 9.97-2.984 20-.064 13.424 1.57 20.908 6.857 31.413 3.555 7.063 10.448 16.738 13.954 19.587 7.008 5.693 10.588 8.118 16.012 10.845 33.238 16.717 74.129 3.067 91.12-30.416 5.096-10.042 6.638-17.258 6.61-30.93-.023-11.37-.346-13.896-2.583-20.155l-2.557-7.157 2.62-4.344c4.286-7.112 7.576-11.818 8.27-11.831 2.326-.044 9.621 17.793 11.436 27.965 5.412 30.332-5.494 61.118-28.631 80.82-7.82 6.66-19.941 13.68-28.957 16.77-12.426 4.259-30.026 5.496-42.5 2.988zm142-14.623c-13.44-1.111-19.287-3.509-25.324-10.385-6.004-6.838-6.399-14.589-2.116-41.547 1.092-6.875 2.45-15.425 3.02-19 .568-3.575 1.434-8.525 1.924-11 .49-2.475 1.18-6.413 1.532-8.75.752-4.996-.59-4.683 18.714-4.362l6.75.112v3.106c0 1.709-.678 6.996-1.507 11.75-3.513 20.147-7.493 47.103-7.49 50.73.006 4.804 2.904 9.776 7.238 12.42 4.668 2.845 13.942 2.707 19.23-.288 7.892-4.47 9.015-7.916 15.058-46.218 1.996-12.65 3.944-24.8 4.33-27l.702-4 12.7-.28 12.701-.28-.467 2.78c-.257 1.529-1.145 7.505-1.973 13.28-.829 5.775-2.457 16.125-3.62 23-1.162 6.875-2.335 17-2.608 22.5l-.495 10 3.606 3.705c7.781 7.998 24.104 5.668 29.98-4.28 2.019-3.417 3.803-10.452 5.561-21.925.632-4.125 1.556-9.525 2.053-12 .497-2.475 1.843-10.575 2.99-18 1.146-7.425 2.329-14.738 2.627-16.25l.543-2.75h12.42c10.842 0 12.421.208 12.421 1.639 0 .901-.86 6.863-1.912 13.25a3841.078 3841.078 0 0 0-4.1 25.61c-5.251 33.604-9.398 42.174-23.96 49.513-6.487 3.27-9.444 4.009-19.875 4.963-13.006 1.19-26.774-.244-34.158-3.558l-5.835-2.619-6.398 2.56c-9.268 3.708-19.6 4.786-34.262 3.574zm166.682.012c-5.738-1.022-14.71-4.459-17.26-6.612-.869-.733-2.01-1.332-2.535-1.332-1.885 0-10.608-9.64-13.562-14.987-2.525-4.57-3.098-6.91-3.546-14.482-.316-5.357-.045-11.376.667-14.794 3.855-18.498 19.533-34.524 40.533-41.434 7.025-2.312 9.697-2.645 21.521-2.684 14.957-.05 20.988 1.23 31.237 6.625 19.755 10.4 26.258 34.27 15.688 57.582-3.584 7.904-14.777 19.388-23.425 24.034-12.102 6.5-18.888 8.347-32 8.705-6.6.18-14.393-.1-17.318-.62zm25.065-21.52c4.944-.677 14.751-5.905 18.262-9.733 4.82-5.256 8.457-13.866 8.48-20.075.031-8.292-5.619-16.796-13.711-20.638-10.104-4.797-26.57-3.21-36.741 3.541-17.435 11.573-18.19 35.542-1.388 44.056 5.1 2.585 13.705 4.443 17.851 3.855 1.375-.195 4.636-.647 7.247-1.005zm149.926 21.576-3.327-.5 8.226-9.5c4.524-5.225 8.497-9.725 8.827-10 .33-.275 4.214-4.55 8.63-9.5 7.092-7.952 10.98-12.656 15.196-18.391 1.022-1.39.609-2.605-2.5-7.345-2.049-3.123-5.036-7.836-6.639-10.472-1.602-2.636-6.665-10.527-11.25-17.536-4.585-7.01-8.336-12.972-8.336-13.25 0-.279 6.029-.506 13.397-.506h13.396l4.854 7.716c2.67 4.245 5.078 8.209 5.353 8.81 1.376 3.005 6.636 10.504 7.637 10.888.629.241 7.318-5.829 14.865-13.488l13.722-13.926h32.009l-3.787 4.25c-2.083 2.337-10.123 10.958-17.866 19.157-7.744 8.199-14.53 15.429-15.08 16.067-.55.637-2.956 3.215-5.346 5.728-3.98 4.184-4.24 4.77-3.093 6.934.689 1.3 7.512 11.746 15.163 23.213 7.65 11.467 13.657 21.103 13.347 21.413-1.098 1.098-24.594.943-25.98-.171-.747-.6-5.024-6.586-9.505-13.301-4.48-6.716-8.547-12.457-9.035-12.759-.897-.554-18.4 17.663-22.393 23.306l-2.158 3.05-12.5.306c-6.875.169-13.997.082-15.827-.193zm140.603-.055c-14.13-1.256-23.413-6.625-27.458-15.883-1.76-4.029-1.932-17.116-.36-27.312 1.01-6.545 2.247-14.383 4.064-25.75.483-3.025 1.577-10 2.43-15.5.853-5.5 1.762-10.563 2.018-11.25.67-1.791 25.527-1.791 25.537 0 .01 1.766-4.425 29.779-9.162 57.87-1.375 8.15-.57 12.864 2.898 16.986 7.015 8.336 21.021 7.621 29.013-1.48 3.284-3.741 5.802-13.614 9.213-36.126 3.082-20.337 5.02-32.617 5.643-35.75l.547-2.75h23.841l-.018 3.25c-.01 1.787-.705 7.525-1.546 12.75a1793.675 1793.675 0 0 0-3.847 25 1476.43 1476.43 0 0 0-1.674 12c-1.198 8.812-2.926 16.453-4.823 21.325-3.34 8.583-12.532 16.789-22.592 20.17-4.208 1.414-20.703 3.709-24 3.338-.55-.062-4.926-.461-9.724-.888zm62.224-2.88c0-5.295 5.894-43.555 9.177-59.565 1.955-9.538 5.011-16.446 9.218-20.836 8.013-8.364 17.952-12.351 33.105-13.281 18.623-1.143 32.154 2.32 39.743 10.171 7.43 7.687 7.978 15.349 3.143 43.946-.837 4.95-1.944 11.925-2.46 15.5-1.544 10.715-2.781 18.38-3.308 20.5-.274 1.1-.758 3.237-1.077 4.75l-.579 2.75H845.02l.709-4.25c.39-2.338 1.1-6.725 1.58-9.75.478-3.025 1.557-9.775 2.398-15 5.147-31.976 5.882-39.347 4.3-43.119-3.588-8.545-14.996-12.352-23.981-8.003-9.02 4.366-11.26 8.976-14.638 30.122-5.546 34.713-6.426 39.874-7.585 44.5l-1.253 5-11.637.281-11.638.282zm-274 1.552c-9.946-2.198-16.274-6.404-19.949-13.26-2.737-5.109-2.794-20.688-.13-35.893 1.057-6.03 2.487-14.79 3.177-19.464a1229.05 1229.05 0 0 1 2.835-18l1.579-9.5 11.91-.284c6.552-.155 12.31.116 12.798.604.515.515.035 6.079-1.145 13.283-1.117 6.818-2.469 15.322-3.003 18.897-.535 3.575-1.683 11-2.552 16.5-2.522 15.975-2.445 22.392.317 26.27 3.315 4.656 7.535 6.522 14.526 6.423 4.658-.066 6.9-.686 10.477-2.898 6.245-3.86 8.608-9.015 11.138-24.295 1.138-6.875 2.518-14.975 3.067-18 1.079-5.94 3.612-22.55 4.618-30.28.343-2.628 1.1-5.074 1.685-5.435 1.458-.901 22.365-1.08 23.783-.205 1.236.765 1.097 1.899-3.607 29.42-1.41 8.25-3.22 19.173-4.023 24.274-2.804 17.818-5.57 24.566-13.033 31.804-4.997 4.846-11.745 8.238-19.968 10.038-7.44 1.629-27.13 1.63-34.5 0zM111.33 162.919c-2.614-12.87-11.835-28.085-23.323-38.48-3.34-3.023-5.755-5.495-5.368-5.495.387 0 3.046 1.187 5.909 2.637 7.274 3.686 16.84 13.705 20.528 21.497 3.368 7.118 5.56 18.872 4.359 23.365-.724 2.705-.9 2.41-2.105-3.524zm7.636-19.27c-3.63-11.473-12.43-22.707-23.94-30.56-5.452-3.72-5.862-4.445-2-3.537 9.356 2.2 19.95 10.953 24.792 20.484 2.3 4.528 4.759 17.604 3.461 18.406-.366.226-1.407-1.93-2.313-4.793zm9.083-11.027c-.265-2.354-1.722-7.043-3.237-10.418-4.243-9.457-11.585-15.347-22.621-18.15-8.411-2.136-7.638-3.677 1.335-2.662 15.489 1.753 25.544 12.048 26.531 27.167.51 7.807-1.197 11.261-2.008 4.063zm9.17.272c-.032-.248-.253-4.05-.491-8.45-.525-9.668-4.476-18.725-10.247-23.485-3.815-3.147-12.772-7.015-16.242-7.015-1.08 0-1.947-.338-1.928-.75.02-.413 4.155-3.9 9.191-7.75 9.627-7.36 23.883-18.51 27.279-21.333 1.102-.917 7.627-5.919 14.5-11.115 6.872-5.197 12.72-9.719 12.995-10.049.275-.33 2.075-1.681 4-3.003 1.925-1.322 3.725-2.668 4-2.992 1.564-1.839 26.257-20.085 26.65-19.693.259.26-3.434 6.933-8.207 14.829-4.774 7.895-9.466 15.706-10.428 17.356-.961 1.65-4.058 6.745-6.881 11.323-2.824 4.578-5.134 8.428-5.134 8.557 0 .128-3.511 6.058-7.803 13.176a9701.819 9701.819 0 0 0-8.997 14.944c-19.398 32.491-22.088 36.776-22.257 35.45zM903.724 94.44c-11.278-5.746-6.835-22.497 5.967-22.497 4.563 0 10.274 4.828 11.134 9.414 1.766 9.415-8.655 17.387-17.101 13.083zm12.528-4.022c5.991-5.987.96-16.475-7.904-16.475-5.093 0-9.089 4.342-9.041 9.826.077 8.93 10.551 13.04 16.945 6.65zm-12.511-4.725c.166-2.338.354-5.263.418-6.5.099-1.916.673-2.248 3.866-2.235 2.063.008 4.253.346 4.868.75 1.586 1.043 1.454 12.235-.144 12.235-.682 0-1.476-.9-1.764-2-.287-1.1-1.24-2-2.116-2-.927 0-1.594.836-1.594 2 0 1.305-.667 2-1.918 2-1.637 0-1.874-.623-1.616-4.25zm7.285-4.5c.244-.734-.446-1.25-1.668-1.25-1.228 0-2.083.645-2.083 1.573 0 1.838 3.12 1.569 3.75-.323z"
        style="fill:#0256a1;fill-opacity:1"
      />
      <path
        d="M137.112 127.439c-.723-12.12-4.08-20.97-9.893-26.087-3.664-3.225-11.39-6.7-16.98-7.638l-1.792-.3 1.096-1.17c.603-.643 6.106-5.055 12.23-9.804a3521.777 3521.777 0 0 0 19.715-15.41c4.72-3.728 13.347-10.418 19.172-14.869 5.824-4.45 12.754-9.761 15.4-11.802 19.326-14.913 29.355-22.28 29.768-21.867.399.399-4.342 8.687-15.56 27.202-5.487 9.057-11.635 19.286-13.662 22.73-5.23 8.887-30.962 51.698-34.576 57.523-4.924 7.937-4.54 7.82-4.918 1.492z"
        style="opacity:.974;fill:#0256a1;fill-opacity:1;stroke-width:.463894"
      />
      <path
        d="M137.086 127.496c-.928-14.85-5.513-24.22-14.231-29.085-3.66-2.042-10.099-4.47-11.882-4.48-2.23-.012-2.564-.61-1.113-2.001 2.099-2.01 41.322-32.6 65.534-51.107 23.501-17.966 30.008-22.757 30.388-22.377.137.137-.315 1.366-1.006 2.731-1.267 2.507-53.899 90.463-61.582 102.915-6.222 10.084-5.709 9.797-6.108 3.404z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.463894"
      />
      <path
        d="M128.946 136.342c-.297-.352-.582-1.516-.834-3.403-.208-1.554-.472-2.74-1.028-4.605-2.125-7.127-5.148-12.372-9.403-16.313-4.088-3.787-8.974-6.298-15.611-8.024-1.98-.514-3.659-1.056-4.55-1.467l-.377-.173v-.565c0-.485.013-.569.096-.603.185-.075 2.307-.096 3.317-.033 5.76.359 10.323 1.49 14.452 3.585 7.894 4.003 13.016 11.079 14.586 20.149.542 3.131.682 7.188.333 9.673-.225 1.605-.583 2.253-.981 1.78z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0550539"
      />
      <path
        d="M112.552 167.78c-.209-.409-.518-1.648-1.084-4.34-.53-2.524-1.031-4.402-1.734-6.493-3.456-10.285-10.377-21.24-18.782-29.728a130.242 130.242 0 0 0-3.358-3.213c-2.987-2.758-5.072-4.873-4.938-5.007.193-.193 5.987 2.575 7.887 3.767 2.772 1.74 5.46 3.94 8.44 6.913 3.829 3.817 6.937 7.77 9.08 11.546 1.926 3.39 3.571 8.176 4.673 13.59.695 3.411.959 5.737.952 8.387-.004 1.646-.028 2.013-.178 2.71-.206.959-.519 1.914-.679 2.074-.101.101-.136.075-.279-.205zM120.93 148.147c-.54-.735-1.036-1.9-1.935-4.542-1.663-4.892-3.445-8.533-6.253-12.774-2.223-3.358-4.558-6.21-7.654-9.35-3.274-3.321-6.117-5.7-10.158-8.5-.807-.56-1.834-1.288-2.281-1.618l-.813-.6v-.696c0-.601.018-.697.133-.697.074 0 .646.126 1.272.28 8.623 2.126 18.329 9.79 23.532 18.581 1.121 1.894 1.749 3.34 2.43 5.6 1.37 4.542 2.325 9.7 2.339 12.63.007 1.46-.072 1.944-.317 1.944-.057 0-.19-.116-.295-.258z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0793397"
      />
      <path
        d="M99.397 137.296a86.072 86.072 0 0 0-3.144-4.12l-.095-.116v-.039l.036.044a86.67 86.67 0 0 1 3.123 4.078l.096.132-.002.02v.02z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="M110.125 145.647a59.258 59.258 0 0 0-.385-.962 31.319 31.319 0 0 0-1.757-3.61c-1.37-2.392-3.182-4.925-5.277-7.383-.13-.152-.147-.177-.147-.205 0-.019.003-.028.008-.023l.185.219c2.32 2.746 4.214 5.444 5.578 7.944a32.557 32.557 0 0 1 1.784 3.896c.05.128.06.165.058.2-.003.041-.003.04-.047-.075z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00914194"
      />
      <path
        d="M91.548 110.57c-.723-.583-1.078-.977-1.058-1.175.02-.211.394-.24 1.266-.097.155.026.258.05.23.054-.075.01-.12.058-.137.146-.008.042-.02.348-.028.68l-.013.602z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0208277"
      />
      <path
        d="M96.23 113.929a72.834 72.834 0 0 0-1.357-.947c-.734-.502-1.168-.805-1.67-1.163l-.135-.095v-.055l.019.014c.344.25 1.118.795 1.874 1.321a105.005 105.005 0 0 1 1.36.961V113.993z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="M93.031 111.698a34.841 34.841 0 0 1-1.342-1.002 2.78 2.78 0 0 1-.242-.2c0-.005.008 0 .02.01l.335.27.006.002c.001 0 .006-.17.01-.378.013-.584.015-.591.016-.088v.453l.444.327c.388.285.535.393.742.542l.046.034.002.026c0 .015 0 .026-.002.026a.284.284 0 0 1-.035-.023zM96.367 110.64l-.234-.089a26.234 26.234 0 0 0-2.847-.891l-.089-.022v-.021c0-.012.001-.021.002-.021a25.165 25.165 0 0 1 3.098.97l.132.05.022.009v.022c0 .016-.001.023-.005.022-.002 0-.038-.013-.079-.03zM107.523 117.449a45.693 45.693 0 0 0-3.167-2.454l-.018-.013v-.055l.018.013a46.256 46.256 0 0 1 3.162 2.446l.074.062v.029a.21.21 0 0 1-.001.029l-.068-.057zM119.578 135.12a63.167 63.167 0 0 0-.45-1.54c-.483-1.567-.946-2.732-1.564-3.932a12.49 12.49 0 0 0-.078-.149l-.016-.028h.05l.012.022c.09.167.366.708.435.855.414.887.82 1.98 1.236 3.33.152.494.273.91.447 1.54l.007.026h-.045zM117.433 129.4a33.489 33.489 0 0 0-1.342-2.279 39.046 39.046 0 0 0-1.662-2.386l-.141-.188.024-.001h.028a36.668 36.668 0 0 1 3.084 4.745l.066.124v.028c0 .027 0 .028-.009.028-.008 0-.014-.01-.047-.071zM112.719 122.606a45.885 45.885 0 0 0-3.118-3.288l-.06-.056v-.062l.026.025a45.54 45.54 0 0 1 3.133 3.292l.095.11v.033l-.002.033z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="m114.252 124.499-.144-.186a42.88 42.88 0 0 0-1.202-1.487l-.11-.13v-.066l.013.015.119.14a42.032 42.032 0 0 1 1.398 1.741l.012.018h-.025c-.025.002-.025.002-.06-.045z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00569262"
      />
      <path
        d="M109.508 119.23a47.442 47.442 0 0 0-1.634-1.481l-.08-.07v-.028c0-.027.001-.029.008-.023.476.405 1.078.948 1.658 1.495l.081.076v.06c-.001 0-.016-.013-.033-.03zM89.738 122.292a67.371 67.371 0 0 0-2.975-1.542l-.183-.09v-.049l.019.01.12.057c.699.336 1.776.873 2.181 1.088.276.146.667.364.888.494l.046.027v.03l-.001.028-.095-.053z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="M85.341 121.955a64.647 64.647 0 0 1-1.655-1.647c-.742-.775-1.112-1.233-1.085-1.342.005-.018.024-.023.068-.018.278.031 1.254.426 2.695 1.09l.1.047V120.127l-.04-.019c-1.485-.695-2.48-1.105-2.714-1.118-.037-.002-.04-.002-.052.007-.01.008-.01.01-.009.027.02.14.52.707 1.455 1.648a81.53 81.53 0 0 0 1.305 1.28l.055.054v.033l-.002.033z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00402307"
      />
      <path
        d="M86.445 120.595a93.706 93.706 0 0 0-.89-.426l-.086-.04-.001-.02v-.021c.006 0 .502.232.821.385l.251.12.04.019v.023c0 .013-.001.023-.003.023l-.132-.063zM87.896 124.337l-.236-.216a120.41 120.41 0 0 1-2.073-1.93c-.138-.132-.128-.12-.12-.165l.002-.016.076.073a148.044 148.044 0 0 0 2.29 2.149l.132.122v.021c0 .012-.002.021-.003.021-.002 0-.032-.027-.068-.06zM113.447 166.2l.014-.062.031-.138c.15-.677.181-1.017.194-2.127.014-1.299-.011-2.252-.086-3.268l-.012-.165c0-.008.002-.009.02-.008l.02.001.014.145c.065.752.104 1.461.118 2.175.005.248.003.876-.004 1.076a13.81 13.81 0 0 1-.184 1.973c-.022.127-.07.36-.08.396-.002.005-.006.007-.023.007-.016 0-.022-.001-.022-.005z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="M112.716 168.075a.202.202 0 0 1-.079-.057c-.175-.183-.367-.778-.653-2.016a78.612 78.612 0 0 1-.377-1.738c0-.002.008-.004.017-.004h.017l.01.042c.018.088.118.55.163.752.352 1.587.566 2.38.733 2.72.064.129.115.212.148.242.02.019.032.025.05.025.033 0 .087-.045.129-.109.136-.207.357-.857.536-1.582l.035-.145h.023c.012 0 .022 0 .022.002 0 .009-.062.254-.105.41-.214.783-.35 1.17-.48 1.353a.343.343 0 0 1-.1.095.13.13 0 0 1-.089.01z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="m111.59 164.179-.086-.412c-.037-.182-.09-.444-.12-.583a45.422 45.422 0 0 0-.55-2.435c0-.002.004-.004.008-.004.007 0 .013.018.046.153.22.89.37 1.557.583 2.562l.169.793c0 .003-.005.005-.016.006l-.018.001z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0041194"
      />
      <path
        d="m110.418 159.22-.037-.128a57.578 57.578 0 0 0-1.487-4.41l-.072-.189v-.03l.002-.03.01.028.06.156a57.373 57.373 0 0 1 1.545 4.604c0 .006-.02.005-.021-.001zM113.073 156.563l-.04-.217a68.6 68.6 0 0 0-1.238-5.533c0-.001.009-.002.02-.002h.021l.03.114a63.124 63.124 0 0 1 1.25 5.655c0 .002-.01.004-.02.004h-.02zM121.18 148.45c-.119-.038-.277-.216-.468-.526-.215-.35-.49-.912-.748-1.526l-.033-.08.001-.058.001-.06.04.096c.284.7.54 1.22.788 1.606.16.25.263.378.371.459.065.049.104.056.161.03a.234.234 0 0 0 .076-.067c.1-.144.15-.485.168-1.123a21.182 21.182 0 0 0-.125-2.882l-.012-.115c0-.002.012-.003.027-.002l.026.001.003.024c.008.062.051.457.063.576.056.548.088.988.109 1.492.007.163.007.775 0 .898-.023.417-.064.694-.132.904a.706.706 0 0 1-.164.298c-.046.045-.073.06-.111.06a.23.23 0 0 1-.041-.005zM120.91 140.9l-.03-.158a67.467 67.467 0 0 0-1.245-5.415l-.023-.083h.023c.018 0 .023.001.025.007 0 .004.023.085.048.18a69.692 69.692 0 0 1 1.235 5.471c0 .005-.031.003-.033-.002zM116.983 138.491a52.38 52.38 0 0 0-1.578-3.182 54.823 54.823 0 0 0-1.286-2.258l-.125-.208v-.046l.03.049a50.185 50.185 0 0 1 2.545 4.695c.157.33.472 1.019.472 1.03l-.01.001c-.011 0-.013-.004-.048-.08z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="m121.399 144.188-.014-.122a46.577 46.577 0 0 0-.473-3.159c0-.002.007-.002.017-.002l.016.001.007.037a54.516 54.516 0 0 1 .5 3.249c0 .009-.002.009-.026.009h-.025zM119.907 146.26c-.14-.343-.216-.538-.32-.813a36.05 36.05 0 0 1-.607-1.757 49.613 49.613 0 0 0-.583-1.723c0-.004.001-.005.007-.004.008.001.014.014.057.133.169.461.329.915.496 1.404.137.401.186.544.25.726.26.752.485 1.366.666 1.821l.056.14.001.041v.088l-.024-.056z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="M100.608 103.624c-1.541-.44-2.658-.84-3.403-1.216-.5-.253-.794-.481-.867-.673a.293.293 0 0 1-.006-.17c.072-.165.329-.287.782-.37.151-.028.17-.029.119-.004-.083.042-.088.077-.093.68l-.004.486.128.06c.569.261.903.395 1.54.616.526.183 1.155.38 1.887.59.176.051.322.094.324.096.024.023-.068.002-.407-.095zM100.717 101.164a28.289 28.289 0 0 0-2.265-.044 31.639 31.639 0 0 0-1.05.031c.005-.002.07-.01.143-.017.77-.078 1.811-.075 3.18.008.25.015.291.02.291.03 0 .01-.034.01-.3-.008z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00867725"
      />
      <path
        d="M111.768 103.328a31.991 31.991 0 0 0-3.072-.956l-.046-.012v-.013c0-.007.001-.013.003-.013l.16.041c.957.253 1.907.549 2.818.878.284.103.271.098.273.112 0 .007 0 .012-.002.012l-.134-.05zM129.801 126.267a31.405 31.405 0 0 0-1.283-5.746c0-.002.006-.003.012-.003h.013l.034.104a31.904 31.904 0 0 1 1.255 5.654l.002.015h-.031zM130.098 132.497c.002-.034.008-.209.014-.464.006-.244.006-1.247 0-1.51a41.625 41.625 0 0 0-.25-3.764c0-.005.002-.007.014-.007h.015l.013.114c.087.78.147 1.533.19 2.374.02.42.031.709.045 1.225.01.409.01 1.354-.004 1.767l-.006.204-.003.09h-.03z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="M129.145 136.551c-.233-.056-.465-.523-.668-1.342-.163-.653-.297-1.462-.422-2.545a9.919 9.919 0 0 0-.043-.337c-.001-.006 0-.009.004-.009l.006.001.011.077c.022.14.047.318.082.577.2 1.458.393 2.39.617 2.972.095.248.204.419.318.497a.237.237 0 0 0 .147.051c.184 0 .355-.26.498-.76.198-.684.337-1.753.394-3.013l.009-.195h.027l-.003.08c-.006.168-.026.53-.042.756-.113 1.591-.36 2.711-.675 3.077a.352.352 0 0 1-.163.112.232.232 0 0 1-.097 0z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00390625"
      />
      <path
        d="M137.292 133.069c-.037-.031-.058-.093-.071-.204-.03-.25-.2-3.153-.404-6.864a149.666 149.666 0 0 0-.13-2.253c-.02-.285-.043-.57-.05-.615-.005-.035-.003-.038.02-.038.014 0 .025.004.025.01l.045.392c.187 1.605.297 2.941.424 5.186.084 1.48.118 1.938.175 2.367.098.729.248 1.023.498.977.378-.07.997-.876 2.453-3.197l.139-.221.003.18.003.181-.147.23c-.297.466-.613.95-.935 1.437-.82 1.234-1.307 1.892-1.656 2.241-.196.196-.316.254-.391.19z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.00996845"
      />
      <path
        d="M142.65 124.996a1860.779 1860.779 0 0 0 7.92-13.05l.538-.895.005.177.005.177-.653 1.087a1593.554 1593.554 0 0 1-7.27 12.02l-.317.516h-.123c-.115 0-.121-.002-.105-.032z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0167992"
      />
      <path
        d="M109.537 93.876c-.602-.094-1.045-.3-1.168-.545-.052-.103-.052-.121-.005-.213.163-.316 1.592-1.616 3.576-3.252 1.827-1.506 3.34-2.696 6.993-5.5 3.673-2.82 11.184-8.632 11.774-9.11.128-.104.144-.11.134-.047-.008.048-.711.618-2.192 1.777-8.135 6.363-14.37 11.288-16.978 13.41-1.662 1.351-2.073 1.72-2.387 2.144-.566.764-.358 1.18.672 1.34l.267.04h-.2c-.11 0-.329-.02-.486-.044z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0332899"
      />
      <path
        d="m187.254 50.944.01-.213 2.219-3.716c7.862-13.165 14.376-24.153 15.194-25.631.173-.313.545-1.103.745-1.581.322-.775.463-1.337.346-1.382-.28-.108-2.042 1.048-5.815 3.812-2.55 1.867-6.533 4.853-11.135 8.347l-1.52 1.152c-.045.032-.048.022-.048-.164v-.198l1.069-.807c6.71-5.072 14.118-10.454 17.145-12.455l.467-.308h.415c.23 0 .416.005.416.011 0 .006-.09.206-.2.445-.621 1.337-2.341 4.464-4.453 8.092-1.29 2.218-2.107 3.586-5.08 8.512-2.98 4.939-7.091 11.782-8.013 13.336l-1.164 1.965c-.307.518-.569.954-.582.969-.014.016-.02-.06-.015-.186z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0265471"
      />
      <path
        d="M179.841 37.362c.081-.068.326-.296.545-.506.559-.538 1.318-1.171 2.909-2.427 1.43-1.129 3.908-3.036 3.924-3.02.005.006.013.088.017.185l.008.175-1.35 1.027-3.751 2.86c-2.142 1.634-2.763 2.094-2.302 1.706z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0293907"
      />
      <path
        d="M132.929 73.575c0-.027.823-.694 1.83-1.482 4.066-3.185 7.76-6.118 10.168-8.075a316.81 316.81 0 0 1 4.046-3.154c2.513-1.93 12.964-9.878 13.091-9.956.032-.019.046-.007.046.036 0 .041-.18.202-.5.448-4.593 3.529-18.047 13.959-25.896 20.076a516.718 516.718 0 0 1-2.742 2.13c-.026.015-.043.007-.043-.023z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0350319"
      />
      <path
        d="m206.353 17.797-.413-.008.245-.15c.467-.287.709-.407.735-.365.02.032-.013.173-.082.358a2.864 2.864 0 0 1-.068.172c-.002 0-.19-.002-.417-.007z"
        style="opacity:.974;fill:#db0707;fill-opacity:1;stroke-width:.0163052"
      />
    </svg>
  );
});
