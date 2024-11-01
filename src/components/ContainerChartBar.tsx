import { useState, useEffect } from "react";
import ChartBar from "./ChartBar";
import {
  TComponentChartAttribute,
  TComponentChartBar,
  TComponentChartGroup,
  TComponentChartGroupAttribute,
} from "../Types/TChartBar";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const ContainerChartBar = (data: TComponentChartBar) => {
  const [currentData, setCurrentData] = useState<TComponentChartBar>(data);
  const [showAttributes, setShowAttributes] = useState<boolean>(false);
  const [newAttributeTitle, setNewAttributeTitle] = useState("");
  const [newGroupTitle, setNewGroupTitle] = useState<string>("");

  useEffect(() => {
    setCurrentData((prevData) => ({
      ...prevData,
      groups: prevData.groups.map((group) => ({
        ...group,
        attributes: syncAttributesWithGroup(
          group.attributes,
          prevData.attributes
        ),
      })),
    }));
  }, [currentData.attributes]);

  const syncAttributesWithGroup = (
    groupAttributes: TComponentChartGroupAttribute[],
    newAttributes: TComponentChartAttribute[]
  ): TComponentChartGroupAttribute[] => {
    const newAttributeIds = newAttributes.map((attr) => attr.id);
    const updatedAttributes = groupAttributes.filter((attr) =>
      newAttributeIds.includes(attr.attribute.id)
    );
    newAttributes.forEach((newAttr) => {
      if (!updatedAttributes.some((attr) => attr.attribute.id === newAttr.id)) {
        updatedAttributes.push({ attribute: newAttr, value: 0 });
      }
    });
    return updatedAttributes;
  };

  const generateId = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  const handleAddGroup = () => {
    if (newGroupTitle.trim() === "") {
      console.error("El título del grupo no puede estar vacío");
      return;
    }

    const groupExists = currentData.groups.some(
      (group) => group.id === newGroupTitle
    );
    if (groupExists) {
      console.error("Ya existe un grupo con este ID");
      return;
    }

    const newGroup: TComponentChartGroup = {
      id: newGroupTitle,
      attributes: currentData.attributes.map((attr) => ({
        attribute: attr,
        value: 0,
      })),
    };
    setCurrentData((prevData) => ({
      ...prevData,
      groups: [...prevData.groups, newGroup],
    }));
    setNewGroupTitle("");
  };

  const handleEditGroupAttribute = (
    groupId: string,
    attributeId: string,
    newValue: number
  ) => {
    setCurrentData((prevData) => {
      const updatedGroups = prevData.groups.map((group) => {
        if (group.id === groupId) {
          const updatedAttributes = group.attributes.map((attr) =>
            attr.attribute.id === attributeId
              ? { ...attr, value: newValue }
              : attr
          );
          return { ...group, attributes: updatedAttributes };
        }
        return group;
      });
      return { ...prevData, groups: updatedGroups };
    });
  };

  const handleDeleteGroup = (id: string) => {
    setCurrentData((prevData) => ({
      ...prevData,
      groups: prevData.groups.filter((group) => group.id !== id),
    }));
  };

  const handleShowAttributes = () => setShowAttributes(!showAttributes);

  const addAttribute = () => {
    if (newAttributeTitle.trim() === "") return;
    const newAttribute: TComponentChartAttribute = {
      title: newAttributeTitle,
      id: generateId(),
    };
    setCurrentData((prevData) => ({
      ...prevData,
      attributes: [...prevData.attributes, newAttribute],
    }));
    setNewAttributeTitle("");
  };

  const removeAttribute = (id: string) => {
    setCurrentData((prevData) => ({
      ...prevData,
      attributes: prevData.attributes.filter(
        (attribute) => attribute.id !== id
      ),
    }));
  };

  return (
    <>
      <Box
        sx={{
          width: "90%",
          height: "90vh",
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "65% 35%" },
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <ChartBar {...currentData} />

        <Box
          sx={{
            height: { xs: "auto", md: "90vh" },
            overflow: { md: "auto" },
            padding: "10px",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#d1d1d1",
              borderRadius: "10px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "10px",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <TextField
              label="New Group Title"
              variant="outlined"
              size="small"
              value={newGroupTitle}
              onChange={(e) => setNewGroupTitle(e.target.value)}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddGroup}
              disabled={!newGroupTitle}
              sx={{ width: { xs: "100%", sm: "140px" } }}
            >
              Add Group
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleShowAttributes}
              sx={{ width: { xs: "100%", sm: "180px" } }}
            >
              {showAttributes ? "Hide Attributes" : "Show Attributes"}
            </Button>
          </Box>

          {showAttributes && (
            <Box
              sx={{
                marginTop: "10px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                color: "black",
              }}
            >
              {currentData.attributes.map((attribute) => (
                <List key={attribute.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeAttribute(attribute.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={attribute.title} />
                  </ListItem>
                </List>
              ))}
              <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="New Attribute"
                  value={newAttributeTitle}
                  onChange={(e) => setNewAttributeTitle(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addAttribute}
                  disabled={newAttributeTitle.length === 0}
                >
                  Add
                </Button>
              </Box>
            </Box>
          )}

          {currentData.groups.map((group) => (
            <Box
              key={group.id}
              sx={{
                padding: "20px",
                marginTop: "20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: "white",
                color: "black",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{group.id}</Typography>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Box sx={{ marginTop: 2 }}>
                {group.attributes.map((attr) => (
                  <Box
                    key={attr.attribute.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Typography sx={{ marginRight: 2 }}>
                      {attr.attribute.title}
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      variant="outlined"
                      size="small"
                      value={attr.value}
                      inputProps={{ min: 0 }}
                      onChange={(e) =>
                        handleEditGroupAttribute(
                          group.id,
                          attr.attribute.id,
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
