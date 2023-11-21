import styled from "styled-components";
import Container from "../components/helpers/ui/Container";
import { parseColor } from "../components/utils/parseColor";
import { devices } from "./breakpoints";

type StyledProps = {
  background: string;
  categories: boolean;
};

export const StyledDetailsContainer = styled(Container)<StyledProps>`
  padding: 2rem 0;

  @media (${devices.semiLarge}) {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }

  @media (${devices.xlarge}) {
    grid-template-columns: ${({ categories }) => (categories ? "250px 1fr 15.5rem;" : "200px 1fr")};
    width: ${({ categories }) => (categories ? "" : "70%")};
    gap: 1rem;
  }

  .background {
    background-color: ${({ background }) => `rgba(${parseColor(background)},
       0.5)`};
    padding: 13px;
    border-radius: 5px;
    margin: 0 auto 1rem;
    width: fit-content;
    position: relative;

    @media (${devices.semiLarge}) {
      width: fit-content;
      height: fit-content;
      place-items: start;
    }

    @media (${devices.large}) {
      margin: 0;
      margin-left: auto;
    }

    .icon {
      position: absolute;
      top: 0;
      right: -1px;
      z-index: 1;
      filter: brightness(70%);
    }

    figure {
      position: relative;
      height: 11rem;
      width: 7.125rem;
      border-radius: 10px;

      @media (${devices.semiLarge}) {
        height: 14rem;
        width: 9rem;
      }

      img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .overview {
    @media (${devices.xlarge}) {
      width: ${({ categories }) => (categories ? "80%" : "85%")};
      margin: 0 auto;
    }
  }

  .intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    gap: 0.3rem;
    text-align: center;

    @media (${devices.semiLarge}) {
      text-align: left;
    }

    .title {
      font-size: clamp(1.5rem, 2.5vw, 2.3rem);
      color: var(--secondary);
      font-family: "Rubik", sans-serif;
      font-weight: bold;
    }

    .subtitle {
      color: var(--neutral-medium);
      font-size: 0.95rem;
      overflow: hidden !important;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .author {
      margin: 0 auto;
      color: var(--secondary);
      font-size: 1rem;
      font-weight: 600;
      padding-bottom: 3px;
      width: fit-content;
      cursor: pointer;

      &:hover {
        background: ${({ background }) => `linear-gradient(to left, #000000c5, rgba(${parseColor(background)}) 100%)`};
        background-position: 0 100%;
        background-size: 100% 2px;
        background-repeat: no-repeat;
      }

      @media (${devices.semiLarge}) {
        margin: 0;
        margin-right: auto;
      }
    }

    .rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      @media (${devices.semiLarge}) {
        padding-top: 0.2rem;
        justify-content: flex-start;
      }

      svg {
        color: ${({ background }) => background};
      }
    }
  }

  .details {
    .synopsis {
      font-size: clamp(1.2rem, 1.5vw, 1.6rem);
      font-weight: 700;
      color: var(--secondary);
      margin-top: 1.2rem;

      @media (${devices.medium}) {
        margin-top: 1.8rem;
      }
    }

    .description {
      padding-top: 0.5rem;
      word-break: break-word;
    }

    .description,
    .description * {
      font-style: normal !important;
      font-weight: 300;
      line-height: 150%;
      word-break: break-word;
    }

    .categories {
      padding-top: 1rem;
      display: flex;
      align-items: center;
      overflow-x: scroll;
      scrollbar-width: none;
      gap: 1rem;
      width: 100%;

      &::-webkit-scrollbar {
        display: none;
      }

      @media (${devices.medium}) {
        overflow-x: hidden;
        flex-wrap: wrap;
        justify-content: center;
      }

      @media (${devices.semiLarge}) {
        justify-content: flex-start;
      }

      @media (${devices.xlarge}) {
        display: none;
      }

      .category {
        font-size: 0.9rem;
        font-weight: 400;
        padding: 7px 10px;
        border-radius: 5px;
        color: black;
        text-align: center;
        min-width: fit-content;
        font-weight: 500;
        text-transform: capitalize;
      }
    }
  }

  aside {
    display: none;

    @media (${devices.xlarge}) {
      display: block;

      .genres {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        width: 100%;

        .category {
          padding: 7px 12px;
          border-radius: 5px;
          text-transform: capitalize;
          font-size: 0.9rem;
          font-weight: 500;
          color: #1a1a1a;
          min-width: fit-content;
          text-transform: capitalize;
        }
      }
    }
  }

  .options {
    display: grid;
    /* justify-content: center; */
    place-items: center;

    padding: 0.5rem 0;

    @media (${devices.large}) {
      place-items: end;
      padding: 1rem 0;
    }

    button {
      width: 139.594px;
      font-size: 0.9rem;
      padding: 8px 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      border: none;
      color: #1a1a1a;
      font-weight: 500;
      background-color: ${({ background }) => `rgba(${parseColor(background)},
       0.5)`};

      &:hover {
        background-color: ${({ background }) => `rgba(${parseColor(background)},
      0.8)`};
        color: var(--neutral-primary);
      }

      @media (${devices.medium}) {
        width: 169.594px;
      }
    }
  }
`;
