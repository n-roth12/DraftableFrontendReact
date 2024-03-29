import "./EditRankingPage.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import {
  useGetCustomRankingByIdQuery,
  useUpdateCustomRankingMutation,
} from "../../features/customRankings/customRankingsApiSlice";
import { useEffect, useState, useRef } from "react";
import { Switch } from "@mui/material";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../utilities/StrictModeDroppable";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Tier from "../../features/customRankings/Tier/Tier";
import Draftable from "../../features/customRankings/Draftable/Draftable";
import PositionFilter from "../../components/PositionFilter/PositionFilter";
import Helmet from "react-helmet";
import LoadingBlock from "../../components/Loading/LoadingBlock/LoadingBlock";
import AddPlayersList from "../../features/customRankings/AddPlayersList/AddPlayersList";
import useResponsiveBreakpoints from "../../utilities/useResponsiveBreakpoints";
import ClearRankingsDialog from "../../components/Dialogs/ClearRankingsDialog/ClearRankingsDialog";

const EditUserRankingPage = () => {
  const { rankingId } = useParams();
  const [editingTitle, setEditingTitle] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [updateCustomRanking] = useUpdateCustomRankingMutation();
  const [hasChanges, setHasChanges] = useState(false);
  const [showAddTier, setShowAddTier] = useState(false);
  const [maxTierIndex, setMaxTierIndex] = useState();
  const [editingIndex, setEditingIndex] = useState();
  const [title, setTitle] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [addPlayersSelectedPosition, setAddPlayersSelectedPosition] =
    useState("ALL");
  const [hasRenderedPositions, setHasRenderedPositions] = useState(false);
  const addPlayersRef = useRef(null);
  const rankingsOptionsRef = useRef(null);
  const mainRef = useRef(null);
  const [activeTab, setActiveTab] = useState("rankings");
  const [unusedPlayers, setUnusedPlayers] = useState([]);
  const [prevPlayers, setPrevPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [showClearRankings, setShowClearRankings] = useState(false);
  const [inputTitle, setInputTitle] = useState();

  const {
    data: customRanking,
    isLoading: isRankingLoading,
    isSuccess: isRankingSuccess,
    isError: isRankingError,
    error: rankingError,
  } = useGetCustomRankingByIdQuery(rankingId);

  // const [players, ] = useState(customRanking?.rankings || [])
  const handleChangeInputTitle = (e) => setInputTitle(e.target.value);
  const size = useResponsiveBreakpoints(mainRef, [
    { small: 860 },
    { large: 900 },
  ]);

  useEffect(() => {
    setTitle(customRanking?.customRanking?.title || "");
    setInputTitle(customRanking?.customRanking?.title || "");
    setPlayers(customRanking?.customRanking?.rankings || []);
    setPrevPlayers(customRanking?.customRanking?.rankings || []);
    getUnusedPlayers(
      customRanking?.aggregatedRanking?.rankings,
      customRanking?.customRanking?.rankings
    );
  }, [customRanking]);

  const getUnusedPlayers = (playersList, rankingsList) => {
    if (playersList) {
      const temp = playersList.filter((x) => {
        return !rankingsList.some((y) => {
          return y.name === x.name;
        });
      });
      setUnusedPlayers(temp);
    }
  };

  const updateTitle = () => {
    if (inputTitle === customRanking?.customRanking?.title) return;
    setTitle(inputTitle);
    updateCustomRanking({
      title: inputTitle,
      id: customRanking?.customRanking?._id,
    });
    setEditingTitle(false);
  };

  useEffect(() => {
    if (!players?.length) return;
    let maxIndex = 0;
    players.forEach((element, index) => {
      if (element?.tier) {
        maxIndex = index;
      }
    });
    setMaxTierIndex(maxIndex);
  }, [players]);

  useEffect(() => {
    if (!hasRenderedPositions) {
      const pos = Array.from(
        getPositions(customRanking?.aggregatedRanking?.rankings)
      );
      if (!pos?.length) return;
      setPositions(pos);
      setHasRenderedPositions(true);
    }
  }, [customRanking, hasRenderedPositions]);

  const handleEditRank = (playerId, newIndex) => {
    const r = filterPlayers(players, selectedPosition).filter((x) => !x?.tier)[
      newIndex
    ];
    const sourceIndex = players.findIndex((x) => x._id === playerId);
    const destIndex = players.findIndex((x) => x._id === r._id);
    if (sourceIndex === destIndex) return;
    const playersCopy = [...players];
    const [reorderedItem] = playersCopy.splice(sourceIndex, 1);
    playersCopy.splice(destIndex, 0, reorderedItem);
    saveChanges(playersCopy);
  };

  const saveChanges = (playersToSave) => {
    setPlayers(playersToSave);
    if (autoSave || size === "small") {
      postChanges(playersToSave);
    } else {
      setHasChanges(true);
    }
  };

  const postChanges = (playersToSave) => {
    updateCustomRanking({
      id: customRanking.customRanking._id,
      rankings: playersToSave,
    });
    setPrevPlayers([...playersToSave]);
    setHasChanges(false);
  };

  const filterPlayers = (_players, _selectedPosition) => {
    const res = _players.filter(
      (player) =>
        player?.position === _selectedPosition ||
        (_selectedPosition === "ALL" &&
          (!player?.tier || player?.position === "ALL"))
    );
    return res;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    const player = filterPlayers(players, selectedPosition)[
      result.source.index
    ];
    const r = filterPlayers(players, selectedPosition)[
      result.destination.index
    ];
    const sourceIndex = players.findIndex((x) => x._id === player._id);
    const destIndex = players.findIndex((x) => x._id === r._id);
    if (player?.tier) {
      if (sourceIndex > destIndex) {
        const temp = players.slice(destIndex, sourceIndex);
        if (
          temp.find((x) => {
            return x?.tier && x?.position === player?.position;
          })
        )
          return;
      } else if (sourceIndex < destIndex) {
        const temp = players.slice(sourceIndex + 1, destIndex + 1);
        if (
          temp.find((x) => {
            return x?.tier && x?.position === player?.position;
          })
        )
          return;
      }
    }
    const playersCopy = [...players];
    const [reorderedItem] = playersCopy.splice(sourceIndex, 1);
    playersCopy.splice(destIndex, 0, reorderedItem);
    saveChanges(playersCopy);
  };

  const addDraftable = (player) => {
    setUnusedPlayers(unusedPlayers.filter((el) => el._id !== player._id));
    const playersCopy = [...players, player];
    setPlayers(playersCopy);
    saveChanges(playersCopy);
  };

  const deleteDraftable = (index) => {
    const player = filterPlayers(players, selectedPosition)[index];
    const tier = player?.tier;
    if (tier) {
      let playersCopy = [...players]
        .filter((x) => x?.tier !== tier)
        .map((x) => {
          if (x?.tier && x?.tier > tier) {
            return { ...x, tier: x.tier - 1 };
          } else {
            return x;
          }
        });
      saveChanges(playersCopy);
    } else {
      const playerIndex = players.findIndex((x) => x._id === player._id);
      let playersCopy = [...players];
      playersCopy.splice(playerIndex, 1);
      setUnusedPlayers([...unusedPlayers, player]);
      saveChanges(playersCopy);
    }
  };

  const addTier = () => {
    let lowestTierIndex = -1;
    let tierCount = 1;
    players.forEach((x, index) => {
      if (
        x?.tier &&
        (x?.position === selectedPosition ||
          (selectedPosition === "ALL" && !x?.position))
      ) {
        lowestTierIndex = index;
        tierCount += 1;
      }
    });
    const playersCopy = [...players];
    const [reorderedItem] = [
      {
        tier: tierCount + 1,
        position: selectedPosition,
        _id: `${selectedPosition}-${tierCount + 1}`,
      },
    ];
    playersCopy.splice(lowestTierIndex + 1, 0, reorderedItem);
    setShowAddTier(false);
    saveChanges(playersCopy);
  };

  const addRankings = (playerList) => {
    let playersListCopy = [];
    let totalCount = 0;
    let positionsCount = { QB: 0, RB: 0, WR: 0, TE: 0, DST: 0, K: 0 };
    playerList.forEach((player) => {
      if (!player?.tier) {
        totalCount += 1;
        positionsCount[player?.position] += 1;
        playersListCopy.push({
          ...player,
          _rank: totalCount,
          _posRank: positionsCount[player?.position],
        });
      } else {
        playersListCopy.push(player);
      }
    });
    return playersListCopy;
  };

  const handleChangeAutosave = () => {
    setAutoSave(!autoSave);
  };

  const clearRankings = () => {
    setUnusedPlayers([...unusedPlayers, ...players]);
    setShowClearRankings(false);
    saveChanges([]);
  };

  const cancelEdit = () => {
    setPlayers([...prevPlayers]);
    setHasChanges(false);
    setShowAddTier(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!inputTitle.length) {
        return;
      }
      updateTitle();
    }
  };

  const getPositions = (x) => {
    let positions = new Set();
    x?.forEach((player) => {
      if (
        player?.position &&
        !positions.has(player?.position) &&
        player?.position !== "ALL"
      ) {
        positions.add(player?.position);
      }
    });
    return positions;
  };

  let content;
  if (isRankingLoading) {
    content = <LoadingBlock />;
  } else if (isRankingSuccess) {
    content = (
      <div className="drag-drop-rankings">
        <div className="table-header">
          <div className="drag-icon-wrapper"></div>
          <div className="rank-wrapper col-label">RK</div>
          <div className="name-wrapper col-label">NAME</div>
          <div className="position-wrapper col-label">POS</div>
          <div className="team-wrapper col-label">TEAM</div>
          <div className="bye-wrapper col-label">BYE</div>
          <div className="buttons-wrapper col-label"></div>
        </div>
        {players?.length > 0 ? (
          <>
            <Tier
              tier={{
                tier: 1,
                position: selectedPosition !== "ALL" && selectedPosition,
              }}
            />
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="players">
                {(provided, snapshot) => (
                  <section {...provided.droppableProps} ref={provided.innerRef}>
                    {filterPlayers(addRankings(players), selectedPosition).map(
                      (player, index) => (
                        <Draggable
                          key={
                            player?.name ||
                            `${player?.position}-${player?.tier?.toString()}`
                          }
                          draggableId={
                            player?.name ||
                            `${player?.position}-${player?.tier?.toString()}`
                          }
                          index={index}
                        >
                          {(provided, snapshot) =>
                            player?.tier ? (
                              <Tier
                                index={index}
                                provided={provided}
                                tier={player}
                                onDelete={deleteDraftable}
                                isBeingDragged={snapshot.isDragging}
                              />
                            ) : (
                              <Draftable
                                handleEditRank={handleEditRank}
                                provided={provided}
                                index={index}
                                player={player}
                                onDelete={deleteDraftable}
                                maxTierIndex={maxTierIndex}
                                showAddTier={showAddTier}
                                setEditingIndex={setEditingIndex}
                                editingIndex={editingIndex}
                                isBeingDragged={snapshot.isDragging}
                                isPositionFiltered={selectedPosition !== "ALL"}
                              />
                            )
                          }
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </section>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : size !== "small" ? (
          <p className="empty-description">
            Click <AiOutlinePlusCircle className="add-icon" /> to add a player
            to custom rankings.
          </p>
        ) : (
          <p className="empty-description">
            Select Add Players to add a player to custom rankings.
          </p>
        )}
      </div>
    );
  } else if (isRankingError) {
    content = <p>{JSON.stringify(rankingError)}</p>;
  }

  return (
    <div className="edit-ranking-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Custom Ranking | Draftabl</title>
        <meta
          name="description"
          content="Edit your custom fantasy rankings for free here. Add tiers and drag-and-drop 
        players to create your own draft cheatsheet."
        />
      </Helmet>
      <Nav />
      <ClearRankingsDialog
        open={showClearRankings}
        onClose={() => setShowClearRankings(false)}
        onClear={clearRankings}
      />
      <main ref={mainRef}>
        <div className="title-wrapper">
          <input
            type="text"
            onBlur={() => updateTitle(title)}
            onFocus={() => setEditingTitle(true)}
            onChange={handleChangeInputTitle}
            onKeyDown={handleKeyDown}
            className={`title-input-text${
              editingTitle ? " selected" : " unselected"
            }`}
            value={
              isRankingLoading
                ? "Loading..."
                : !editingTitle
                ? title
                : inputTitle
            }
          />
        </div>
        <div className="updated-wrapper">
          {customRanking?.customRanking?.updatedAt && (
            <p className="last-update">
              Last updated{" "}
              {new Date(customRanking?.customRanking?.updatedAt).getMonth() + 1}
              /{new Date(customRanking?.customRanking?.updatedAt).getDate()}/
              {new Date(customRanking?.customRanking?.updatedAt).getFullYear()}
            </p>
          )}
        </div>
        <p className="description">
          Drag and drop players and tiers, or type on their rank and hit enter
          to adjust rankings.
        </p>
        {size === "large" && (
          <div className="columns-wrapper">
            <div className="rankings-wrapper">
              <div className="save-wrapper">
                <div className="save-wrapper-inner">
                  <h3>Rankings</h3>
                  {customRanking?.aggregatedRanking?.rankings?.length && (
                    <p className="length-indicator">
                      {players?.length}/
                      {customRanking?.aggregatedRanking?.rankings?.length}
                    </p>
                  )}
                  <Switch
                    checked={autoSave}
                    onChange={handleChangeAutosave}
                    size="small"
                  />
                  <p className="autosave-wrapper">
                    Autosave{" "}
                    <span className="autosave">{autoSave ? "On" : "Off"}</span>
                  </p>
                  {!autoSave && (
                    <>
                      <button
                        className={`submit-btn${
                          !hasChanges ? " disabled" : ""
                        }`}
                        onClick={() => postChanges(players)}
                        disabled={!hasChanges}
                      >
                        Save
                      </button>
                      <button
                        className={`cancel-btn${
                          !hasChanges ? " disabled" : ""
                        }`}
                        onClick={cancelEdit}
                        disabled={!hasChanges}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="table-options-wrapper" ref={rankingsOptionsRef}>
                <PositionFilter
                  positions={positions}
                  selectedPos={selectedPosition}
                  onChange={setSelectedPosition}
                  parentRef={rankingsOptionsRef}
                />
                <div>
                  <button className="add-tier-btn" onClick={addTier}>
                    Add Tier
                  </button>
                  <button
                    className="clear-rankings-btn"
                    onClick={() => setShowClearRankings(true)}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="drag-drop-rankings-wrapper">{content}</div>
            </div>
            <div className="add-players-wrapper" ref={addPlayersRef}>
              <h3>Add Players</h3>
              <PositionFilter
                positions={positions}
                selectedPos={addPlayersSelectedPosition}
                onChange={setAddPlayersSelectedPosition}
                parentRef={addPlayersRef}
              />
              <AddPlayersList
                players={filterPlayers(
                  unusedPlayers,
                  addPlayersSelectedPosition
                )}
                addPlayer={addDraftable}
              />
            </div>
          </div>
        )}
        {size === "small" && (
          <>
            <div className="tab-btns-wrapper">
              <button
                onClick={() => setActiveTab("rankings")}
                className={`tab-btn ${
                  activeTab === "rankings" ? "active" : ""
                }`}
              >
                Rankings
                {customRanking?.aggregatedRanking?.rankings?.length && (
                  <span className="small-length-indicator">
                    {players?.length}/
                    {customRanking?.aggregatedRanking?.rankings?.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("players")}
                className={`tab-btn ${activeTab === "players" ? "active" : ""}`}
              >
                Add Players
              </button>
            </div>
            {activeTab === "rankings" ? (
              <div className="rankings-wrapper">
                <div className="table-options-wrapper" ref={rankingsOptionsRef}>
                  <PositionFilter
                    positions={positions}
                    selectedPos={selectedPosition}
                    onChange={setSelectedPosition}
                    parentRef={rankingsOptionsRef}
                  />
                  <div>
                    <button className="add-tier-btn" onClick={addTier}>
                      Add Tier
                    </button>
                    <button
                      className="clear-rankings-btn"
                      onClick={() => setShowClearRankings(true)}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="drag-drop-rankings-wrapper">{content}</div>
              </div>
            ) : (
              <div className="add-players-wrapper" ref={addPlayersRef}>
                <PositionFilter
                  positions={positions}
                  selectedPos={addPlayersSelectedPosition}
                  onChange={setAddPlayersSelectedPosition}
                  parentRef={addPlayersRef}
                />
                <AddPlayersList
                  players={filterPlayers(
                    unusedPlayers,
                    addPlayersSelectedPosition
                  )}
                  addPlayer={addDraftable}
                />
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EditUserRankingPage;
