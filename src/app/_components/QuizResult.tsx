import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const QuizResult = () => {
  return (
    <div className="flex full-size" style={{alignItems: "center", justifyContent: "center"}}>
      <BarChart
        width={800}
        height={400}
        data={[
          {name: '1', correct: 40},
          {name: '2', correct: 30},
          {name: '3', correct: 20},
          {name: '4', correct: 27},
          {name: '5', correct: 18},
        ]}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Legend />
        <Bar 
          dataKey="correct" 
          fill="#6ebce6" 
          barSize={50}
          />
      </BarChart>
    </div>
  )
}