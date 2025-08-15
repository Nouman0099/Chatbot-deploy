import { ColorRing } from "react-loader-spinner";
export default function Loading1({ color = "#9333EA" }: { color?: string }) {
  return (
    <div className="flex justify-center">
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={[color, color, color, color, color]}
      />
    </div>
  );
}