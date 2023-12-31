import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
  }

  :root {

    /* primary */
    --primary: #c2a410;
    --primary-light: #f9f6e7;
    --primary-hover: #daa520;

    /* secondary */
    --secondary: #3f3d56;
    --secondary-light: #c8e0eb;


    /* neutral */
    --neutral-primary: #fff;
    --neutral-medium: rgba(0, 0, 0, 0.45);
    --neutral-light: #f2f2f2;   
    
    --toastify-color-success: var(--primary);
    --toastify-icon-color-success: var(--primary);

    --toastify-color-info: var(--secondary);
    --toastify-icon-color-info: var(--secondary);
  }

`;
