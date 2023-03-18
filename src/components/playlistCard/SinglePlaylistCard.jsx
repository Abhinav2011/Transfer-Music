import React from "react";
import { Card,Checkbox,Image} from "semantic-ui-react";

const SinglePlaylistCard = ({ playlistName, imageUrl,handleCheckedStateChange,index,checkedState }) => {
  return (
    <Card className="single-card">
      <Image src={imageUrl} wrapped ui={false} />
      <Card.Content className="single-card-content">
        <Card.Header style={{ fontSize: "2rem" }}>{playlistName}</Card.Header>
      </Card.Content>
      <Card.Content extra className="single-card-extra">
        <Checkbox
          key={index}
          checked={checkedState}
          onChange={() => handleCheckedStateChange(index)}
          label={"Add this to Spotify"}
        ></Checkbox>
      </Card.Content>
    </Card>
  );
};

export default SinglePlaylistCard;
