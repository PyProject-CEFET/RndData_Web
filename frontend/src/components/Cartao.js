import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Cartao = ({ imagem, titulo }) => {
  return (
    <div>
      <Card sx={{ width: 240, height: 250, marginLeft: "20px", marginBottom: "20px" }}>
        <CardMedia
          component="img"
          sx={{ height: 180 }}
          image={imagem}
          title={titulo}
        />
        <CardContent>
          <h4 style={{ margin: 0 }}>{titulo}</h4>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cartao;
