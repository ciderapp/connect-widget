import React from "react";
import {
  StyledAlbumArtThumb,
  StyledArtistDetails,
  StyledArtistName,
  StyledDynamicIsland,
  StyledDynamicIslandTopContent,
  StyledMusicIcon,
  StyledMusicIconBar,
  StyledPlayBar,
  StyledPlayBarWrapper,
  StyledSongControls,
  StyledSongControlsWrappers,
  StyledSongName
} from "./DynamicIsland.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faPause,
  faForward,
  faCompactDisc
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const StyledDynamicIslandMotion = motion(StyledDynamicIsland);
const StyledMusicIconBarMotion = motion(StyledMusicIconBar);
const StyledMusicAlbumArtThumbMotion = motion(StyledAlbumArtThumb);
const StyledMusicIconMotion = motion(StyledMusicIcon);
const StyledArtistDetailsMotion = motion(StyledArtistDetails);

type NowPlaying = {
    album?: string;
    artist?: string;
    artworkURL?: string;
    colors?: {
        bgColor?: string,
        textColor1?: string,
        textColor2?: string,
        textColor3?: string
    };
    duration?: number;
    id?: string;
    title?: string;
}

const DynamicIsland = (props: {props: {open?: boolean, nP: any }}) => {
  const [isOpen, setIsOpen] = React.useState(props.props.open || false);

  const { nP } = props.props;
  let nowPlaying = nP;

  //console.log(nowPlaying);

  var ms = nowPlaying.currentPlaybackDuration,
      min = 0|(ms/1000/60),
      sec = 0|(ms/1000) % 60;

  var msT = nowPlaying.currentPlaybackTime,
      minT = 0|(msT/1000/60),
      secT = 0|(msT/1000) % 60;


  const variants = {
    open: {
      width: "300px",
      height: "auto",
      borderRadius: "20px"
    },
    closed: {
      width: "96px",
      height: "36px",
      borderRadius: "99px"
    }
  };

  const iconVariants = {
    open: {
      width: "48px",
      height: "48px",
      borderRadius: "12px"
    },
    closed: {
      width: "20px",
      height: "20px",
      borderRadius: "4px"
    }
  };

  return (
    <StyledDynamicIslandMotion
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      isOpen={isOpen}
    >
      <StyledDynamicIslandTopContent isOpen={isOpen}>
        <StyledMusicAlbumArtThumbMotion
          animate={isOpen ? "open" : "closed"}
          variants={iconVariants}
          src={nowPlaying?.track?.artwork ? nowPlaying.track.artwork : "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
        />
        <div>
          {isOpen && (
            <StyledArtistDetailsMotion
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <StyledSongName>{nowPlaying.track.title}</StyledSongName>
              <StyledArtistName>{nowPlaying.track.artist}</StyledArtistName>
            </StyledArtistDetailsMotion>
          )}
        </div>
        <StyledMusicIconMotion animate={{ opacity: isOpen ? [0, 1] : 1 }}>
          <StyledMusicIconBarMotion
            initial={{ height: "0" }}
            animate={{ height: "100%" }}
            transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
          />
          <StyledMusicIconBarMotion
            initial={{ height: "0" }}
            animate={{ height: "100%" }}
            transition={{ duration: 1, delay: 0.75, repeat: Infinity }}
          />
          <StyledMusicIconBarMotion
            initial={{ height: "0" }}
            animate={{ height: "75%" }}
            transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
          />
        </StyledMusicIconMotion>
      </StyledDynamicIslandTopContent>
      {isOpen && (
        <>
          <StyledPlayBarWrapper>
            <span>{`${minT}:${secT < 10 ? '0' + secT : secT}`}</span>
            <StyledPlayBar />
            <span>-{`${min}:${sec < 10 ? '0' + sec : sec}`}</span>
          </StyledPlayBarWrapper>
          <StyledSongControlsWrappers>
            <div />
            <StyledSongControls>
              <FontAwesomeIcon size="2x" icon={faBackward} />
              <FontAwesomeIcon size="3x" icon={faPause} />
              <FontAwesomeIcon size="2x" icon={faForward} />
            </StyledSongControls>
            <div>
              <FontAwesomeIcon size="2x" icon={faCompactDisc} />
            </div>
          </StyledSongControlsWrappers>
        </>
      )}
    </StyledDynamicIslandMotion>
  );
};

DynamicIsland.displayName = "DynamicIsland";

export default DynamicIsland;
