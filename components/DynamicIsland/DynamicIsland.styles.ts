import styled, { css } from "styled-components";

interface StyledDynamicIslandProps {
  isOpen: boolean;
}

export const StyledDynamicIsland = styled.div<StyledDynamicIslandProps>`
  align-items: ${({isOpen}) => (isOpen ? "flex-start" : "center")};
  border-radius: 99px;
  background-color: #000000;
  color: #000000;
  width: 96px;
  width: fit-content;
  padding: ${({isOpen}) => (isOpen ? "24px" : "8px 16px")};
  font-size: 0.75rem;
  display: grid;
  cursor: pointer;
  ${({isOpen}) =>
      isOpen &&
      css`
      grid-template-rows: 75px 36px 40px;
    `}
`;
interface StyledDynamicIslandTopContentProps {
  isOpen: boolean;
}
export const StyledDynamicIslandTopContent = styled.div<
  StyledDynamicIslandTopContentProps
>`
  display: grid;
  grid-template-columns: ${({ isOpen }) =>
    isOpen ? "48px 1fr 12px" : "20px 1fr 12px"};
  grid-gap: 16px;
  align-items: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  justify-content: center;
  width: 100%;
`;

export const StyledMusicIcon = styled.div`
  width: 12px;
  height: 12px;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
`;

export const StyledMusicIconBar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(0deg,
  rgb(255, 37, 97) 0%,
  rgb(248, 27, 84) 100%);
`;

export const StyledAlbumArtThumb = styled.img`
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

export const StyledArtistDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4px;
  align-items: center;
  justify-content: center;
  grid-template-rows: repeat(2, 1fr);
`;
export const StyledArtistName = styled.div`
  font-size: 1rem;
  font-weight: 200;
  color: #fff;
  letter-spacing: 0.5px;
`;

export const StyledSongName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
`;

export const StyledPlayBarWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #fff;
  font-size: 0.75rem;
`;
export const StyledPlayBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 99px;
  position: relative;
  &:after {
    content: "";
    width: 70%;
    height: 100%;
    background-color: #fff;
    border-radius: 99px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

export const StyledSongControlsWrappers = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  align-items: center;
  &:last-child {
    text-align: right;
  }
`;
export const StyledSongControls = styled.div`
  display: grid;
  grid-gap: 32px;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #fff;
  grid-template-columns: 32px auto 32px;
`;
