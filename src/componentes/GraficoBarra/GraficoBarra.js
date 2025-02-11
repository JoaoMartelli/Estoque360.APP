import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const GraficoBarra = ({ dados }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || dados.length === 0) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dados.map(item => item.categoria),
        datasets: [
          {
            label: "Quantidade de Produtos",
            data: dados.map(item => item.quantidade),
            backgroundColor: "rgba(100, 100, 100, 0.6)", // 🔹 Cinza neutro
            borderColor: "rgba(80, 80, 80, 1)", // 🔹 Borda um pouco mais escura
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // 🔹 Permite redimensionamento adequado
        scales: {
          x: {
            ticks: {
              autoSkip: false, // 🔥 Garante que todos os rótulos apareçam
              maxRotation: 45, // 🔥 Inclina os rótulos para melhorar leitura
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [dados]);

  return (
    <div style={{ width: "100%", height: "500px" }}> {/* 🔹 Aumentamos a altura do gráfico */}
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GraficoBarra;