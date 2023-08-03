import { styled } from "styled-components";
import { devices } from "../../../styles/breakpoints";
import Container from "./Container";

const SkeletonContainer = styled(Container)`
  padding: 2rem 0;
  @media (${devices.semiLarge}) {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }

  @media (${devices.xlarge}) {
    grid-template-columns: 250px 1fr 15.5rem;
    gap: 1rem;
  }

  .image {
    .background {
      background-color: var(--neutral-light);
      border-radius: 5px;
      height: calc(11rem + 26px);
      width: calc(7.125rem + 26px);
      margin: 0 auto 1rem;

      @media (${devices.semiLarge}) {
        height: calc(14rem + 26px);
        width: calc(9rem + 26px);
        place-items: start;
      }

      @media (${devices.large}) {
        margin: 0;
        margin-left: auto;
      }
    }

    .options {
      display: grid;
      place-items: center;
      padding: 0.5rem 0;

      @media (${devices.large}) {
        place-items: end;
        padding: 1rem 0;
      }
      .button {
        background-color: var(--neutral-light);
        border-radius: 5px;
        width: 139.594px;
        padding: 17px 0px;

        @media (${devices.medium}) {
          width: 169.594px;
        }
      }
    }
  }

  .overview {
    @media (${devices.xlarge}) {
      width: 80%;
      margin: 0 auto;
    }
  }

  .intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    gap: 0.3rem;

    @media (${devices.semiLarge}) {
      align-content: flex-start;
    }

    .title,
    .subtitle,
    .rating,
    .author {
      background-color: var(--neutral-light);
      border-radius: 5px;

      @media (${devices.semiLarge}) {
        margin: 0;
        margin-right: auto;
      }
    }

    .title {
      width: 100%;
      height: 1.5rem;
    }

    .subtitle,
    .rating {
      width: 20%;
      height: 1rem;
      margin: 0 auto;
    }

    .author {
      width: 30%;
      height: 1rem;
      margin: 0 auto;
    }

    .rating {
      @media (${devices.semiLarge}) {
        padding-top: 0.2rem;
        justify-content: flex-start;
      }
    }

    .title,
    .subtitle,
    .author,
    .rating {
      @media (${devices.semiLarge}) {
        margin: 0;
        margin-right: auto;
      }
    }
  }

  .details {
    .synopsis {
      background-color: var(--neutral-light);
      border-radius: 5px;
      width: 120px;
      height: 1rem;
      margin-top: 1.2rem;

      @media (${devices.medium}) {
        margin: 1.8rem 0 0.8rem;
      }
    }

    .description {
      padding-top: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      p {
        background-color: var(--neutral-light);
        width: 100%;
        height: 0.8rem;
      }
    }

    .categories {
      padding-top: 1rem;
      display: flex;
      gap: 1rem;
      width: 100%;
      overflow-x: scroll;
      scrollbar-width: none;

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

      p {
        background-color: var(--neutral-light);
        border-radius: 5px;
        height: 1.8rem;
        min-width: 100px;
      }
    }
  }

  aside {
    display: none;

    @media (${devices.xlarge}) {
      display: block;

      .content {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        width: 100%;

        p {
          background-color: var(--neutral-light);
          border-radius: 5px;
          height: 1.8rem;
          min-width: 100px;

          &:nth-child(2n) {
            min-width: 80px;
          }

          &:nth-child(3n) {
            min-width: 130px;
          }
        }
      }
    }

    .heading {
      display: none;

      @media (${devices.xlarge}) {
        display: block;
        margin-bottom: 1rem;
        background-color: var(--neutral-light);
        border-radius: 5px;
        height: 0.7rem;
        width: 100px;
      }
    }
  }
`;

const LoadingDetails = () => {
  return (
    <SkeletonContainer>
      <section className="image">
        <div className="background"></div>
        <div className="options">
          <p className="button" />
        </div>
      </section>

      <section className="overview">
        <div className="intro">
          <p className="title" />
          <p className="subtitle" />
          <p className="author" />
          <p className="rating" />
        </div>

        <article className="details">
          <div className="categories">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <p key={i} />
              ))}
          </div>

          <div>
            <p className="synopsis" />
            <div className="description">
              {Array(15)
                .fill(0)
                .map((_, i) => (
                  <p key={i} />
                ))}
            </div>
          </div>
        </article>
      </section>

      <aside>
        <p className="heading" />
        <div className="content">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <p key={i} />
            ))}
        </div>
      </aside>
    </SkeletonContainer>
  );
};

export default LoadingDetails;
