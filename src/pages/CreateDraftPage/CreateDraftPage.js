import "./CreateDraftPage.scss";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { Helmet } from "react-helmet";
import { TextField, MenuItem, Select } from "@material-ui/core";
import LabeledSelect from "../../components/LabeledSelect/LabeledSelect";

const CreateDraftPage = () => {
  const [selectedScoring, setSelectedScoring] = useState("Standard");
  const [scoring, setScoring] = useState(["Standard", "Half-PPR", "PPR"]);
  const [numberOfTeams, setNumberOfTeams] = useState(
    [...Array(30).keys()].map((i) => i + 4)
  );
  const [selectedNumberOfTeams, setSelectedNumberOfTeams] = useState(10);
  const [selectedDraftPosition, setSelectedDraftPosition] = useState(1);
  const [draftPositions, setDraftPositions] = useState(
    [...Array(selectedNumberOfTeams).keys()].map((i) => i + 1)
  );
  const [selectedDraftType, setSelectedDraftType] = useState("Snake");
  const [draftTypes, setDraftTypes] = useState(["Snake", "Linear"]);
  const [rosterPositions, setRosterPositions] = useState({
    QB: 1,
    RB: 2,
    WR: 2,
    TE: 1,
    "FLEX (WR/RB/TE)": 1,
    "FLEX (WR/RB)": 0,
    SuperFLEX: 0,
    DST: 1,
    K: 1,
    BENCH: 6,
  });

  const handleChangeScoring = (e) => setSelectedScoring(e.target.value);
  const handleChangeNumberOfTeams = (e) => {
    setSelectedNumberOfTeams(e.target.value);
    setDraftPositions([...Array(e.target.value).keys()].map((i) => i + 1));
    setSelectedDraftPosition(1);
  };
  const handleChangeDraftPosition = (e) =>
    setSelectedDraftPosition(e.target.value);
  const handleChangeDraftType = (e) => setSelectedDraftType(e.target.value);
  const handleChangeRosterPositions = (pos, e) => {
    let rosterPositionsCopy = { ...rosterPositions };
    rosterPositionsCopy[pos] = e.target.value;
    setRosterPositions(rosterPositionsCopy);
  };

  return (
    <div className="create-draft-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Draft | Draftabl</title>
        <meta
          name="description"
          content="Start a mock draft with your custom rankings."
        />
      </Helmet>
      <Nav />
      <main>
        <div className="create-draft-page-inner">
          <h1>Create Draft</h1>
          <p>
            Pick the settings for your draft and hit start when you are ready!
          </p>
          <h3>Draft Settings</h3>
          <div className="type-select-wrapper">
            <LabeledSelect
              labelValue="Draft Type"
              selectOptions={draftTypes}
              selectedOption={selectedDraftType}
              handleChange={handleChangeDraftType}
              extraClassName="draft-type-select"
            />
            <LabeledSelect
              labelValue="Scoring"
              selectOptions={scoring}
              selectedOption={selectedScoring}
              handleChange={handleChangeScoring}
              extraClassName="scoring-select"
            />
          </div>
          <div className="draft-select-wrapper">
            <LabeledSelect
              labelValue="League Size"
              selectOptions={numberOfTeams}
              selectedOption={selectedNumberOfTeams}
              handleChange={handleChangeNumberOfTeams}
              extraClassName={"league-size-select"}
            />
            <LabeledSelect
              labelValue="Draft Position"
              selectOptions={draftPositions}
              selectedOption={selectedDraftPosition}
              handleChange={handleChangeDraftPosition}
              extraClassName="draft-position-select"
            />
          </div>
          <h3>Roster Positions</h3>
          <div className="roster-select-wrapper">
            {Object.keys(rosterPositions).map((pos) => (
              <LabeledSelect
                labelValue={pos}
                selectOptions={[...Array(12).keys()]}
                selectedOption={rosterPositions[pos]}
                handleChange={(e) => handleChangeRosterPositions(pos, e)}
                extraClassName="roster-pos-select"
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateDraftPage;
