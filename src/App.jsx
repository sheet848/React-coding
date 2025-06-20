import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Overview from './components/Overview'
import DarkToggle from './components/DarkToggle'
import LikeButton from './components/LikeButton'
import Accordion from './components/Accordion'
import DigitalClock from './components/DigitalClock'
import StopWatch from './components/StopWatch'
import Switch from './components/Switch'
import StarRating from './components/StarRating'
import Breadcrumbs from './components/Breadcrumbs'
import Pagination from './components/Pagination'
import Typeahead from './components/Typeahead'
import TodoList from './components/TodoList'
import PollWidget from './components/PollWidget'
import Toast from './components/Toast'
import TicTacToe from './components/TicTacToe'
import StepForm from './components/StepForm'
import Carousel from './components/Carousel'
import MemoryGame from './components/MemoryGame'
import SelectableGrid from './components/SelectableGrid'
import QuizApp from './components/QuizApp'
import Stepper from './components/Stepper'
import ProgressBar from './components/ProgressBar'
import Password from './components/Password'
import CountdownTimer from './components/CountdownTimer'
import Traffic from './components/Traffic'
import OTP_Login from './components/OTP_Login'
import JobBoard from './components/JobBoard'
import GridLights from './components/GridLights'
import TabList from './components/TabList'
import Modal from './components/Modal'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Overview />} />
          <Route path='/darktoggle' element={<DarkToggle />} />
          <Route path='/like' element={<LikeButton />} />
          <Route path='/accordion' element={<Accordion />} />
          <Route path='/digital-clock' element={<DigitalClock />} />
          <Route path='/stop-watch' element={<StopWatch />} />
          <Route path='/switch' element={<Switch />} />
          <Route path='/star-rating' element={<StarRating />} />
          <Route path='/breadcrumbs' element={<Breadcrumbs />} />
          <Route path='/pagination' element={<Pagination />} />
          <Route path='/typeahead' element={<Typeahead />} />
          <Route path='/todolist' element={<TodoList />} />
          <Route path='/poll-widget' element={<PollWidget />} />
          <Route path='/toast' element={<Toast />} />
          <Route path='/tictactoe' element={<TicTacToe />} />
          <Route path='/step-form' element={<StepForm />} />
          <Route path='/image-carousel' element={<Carousel />} />
          <Route path='/memory-game' element={<MemoryGame />} />
          <Route path='/selectable-grid' element={<SelectableGrid />} />
          <Route path='/quiz-app' element={<QuizApp />} />
          <Route path='/stepper' element={<Stepper />} />
          <Route path='/progress-bar' element={<ProgressBar />} />
          <Route path='/password' element={<Password />} />
          <Route path='/countdown-timer' element={<CountdownTimer />} />
          <Route path='/traffic-light' element={<Traffic />} />
          <Route path='/otp-login' element={<OTP_Login />} />
          <Route path='/job-board' element={<JobBoard />} />
          <Route path='/grid-lights' element={<GridLights />} />
          <Route path='/tab-lists' element={<TabList />} />
          <Route path='/modal-dialog' element={<Modal />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
