import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Divider from "@mui/material/Divider";
import { Icon } from "@mui/material";

const Lista = ({ dados, titulo }) => {
  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}>
        <h3 style={{margin: 0}}>{titulo}</h3>
        <List>
          <Divider />
          {dados.map((item) => (
            <div key={item.id}>
              <ListItem disablePadding>
                <ListItemButton sx={{ py: 0 }}>
                  <ListItemText primary={item.tipo} />
                  <Icon sx={{ color: "#ccc" }}>
                    <ArrowForwardIosIcon />
                  </Icon>
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Lista;
