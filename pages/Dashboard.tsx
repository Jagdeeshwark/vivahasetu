import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, ChevronDown, CirclePlus, IndianRupee, PartyPopper, Plus, Trash2, WalletCards } from 'lucide-react';

const initialTasks = [
  { id: 1, title: 'Fix wedding date', category: '12+ months', done: true },
  { id: 2, title: 'Set guest list', category: '12+ months', done: true },
  { id: 3, title: 'Book the venue', category: '10–12 months', done: false },
  { id: 4, title: 'Hire a photographer', category: '8–10 months', done: false },
  { id: 5, title: 'Order wedding invitations', category: '3–6 months', done: false },
  { id: 6, title: 'Book bridal makeup', category: '1–3 months', done: false },
];

const budgetSeed = [
  { id: 1, name: 'Venue', budget: 450000 },
  { id: 2, name: 'Food & Catering', budget: 320000 },
  { id: 3, name: 'Photography', budget: 180000 },
  { id: 4, name: 'Decor', budget: 220000 },
];

export function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('12+ months');
  const [budget, setBudget] = useState(budgetSeed);
  const [totalBudget, setTotalBudget] = useState(1500000);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('vivahasetu-planner') ?? localStorage.getItem('wedin-planner');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTasks(Array.isArray(parsed.tasks) ? parsed.tasks : initialTasks);
        setBudget(Array.isArray(parsed.budget) ? parsed.budget : budgetSeed);
        setTotalBudget(Number.isFinite(parsed.totalBudget) ? parsed.totalBudget : 1500000);
      } catch {
        localStorage.removeItem('vivahasetu-planner');
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem('vivahasetu-planner', JSON.stringify({ tasks, budget, totalBudget }));
  }, [tasks, budget, totalBudget, hydrated]);

  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const allocated = useMemo(() => budget.reduce((sum, item) => sum + item.budget, 0), [budget]);

  function addTask(event: FormEvent) {
    event.preventDefault();
    if (!taskTitle.trim()) return;
    const nextTasks = [...tasks, { id: Date.now(), title: taskTitle.trim(), category: taskCategory, done: false }];
    setTasks(nextTasks);
    persist(nextTasks);
    setTaskTitle('');
  }

  function resetPlanner() {
    setTasks(initialTasks);
    setBudget(budgetSeed);
    setTotalBudget(1500000);
    persist(initialTasks, budgetSeed, 1500000);
  }

  function addBudget(event: FormEvent) {
    event.preventDefault();
    const amount = Number(newAmount);
    if (!newCategory.trim() || amount <= 0) return;
    const nextBudget = [...budget, { id: Date.now(), name: newCategory.trim(), budget: amount }];
    setBudget(nextBudget);
    persist(tasks, nextBudget);
    setNewCategory('');
    setNewAmount('');
  }

  function persist(nextTasks = tasks, nextBudget = budget, nextTotal = totalBudget) {
    localStorage.setItem('vivahasetu-planner', JSON.stringify({ tasks: nextTasks, budget: nextBudget, totalBudget: nextTotal }));
  }

  const format = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  return (
    <main className="dashboard-page page-shell">
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">MY WEDDING</span>
          <h1>Plan beautifully, stay in control.</h1>
          <p>Two months of momentum start with one clear checklist.</p>
        </div>
        <div className="progress-card">
          <div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` } as React.CSSProperties}><strong>{progress}%</strong></div>
          <div><b>{completed} of {tasks.length}</b><span>tasks complete</span><button className="reset-button" onClick={resetPlanner}>Reset plan</button></div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel checklist-panel">
          <div className="panel-heading"><div><PartyPopper size={21} /><h2>Wedding checklist</h2></div><span>{tasks.length} tasks</span></div>
          <form className="task-form" onSubmit={addTask}>
            <input value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="Add a planning task" />
            <label><ChevronDown size={14} /><select value={taskCategory} onChange={(event) => setTaskCategory(event.target.value)} aria-label="Task timeline"><option>12+ months</option><option>10–12 months</option><option>8–10 months</option><option>6–8 months</option><option>3–6 months</option><option>1–3 months</option></select></label>
            <button aria-label="Add task"><Plus /></button>
          </form>
          <div className="task-list">
            {tasks.map((task) => (
              <article key={task.id} className={task.done ? 'task task--done' : 'task'}>
                <button className="check-button" onClick={() => { const nextTasks = tasks.map((item) => item.id === task.id ? { ...item, done: !item.done } : item); setTasks(nextTasks); persist(nextTasks); }} aria-label="Toggle task">{task.done && <Check size={15} />}</button>
                <div><strong>{task.title}</strong><span>{task.category}</span></div>
                <button className="delete-button" onClick={() => { const nextTasks = tasks.filter((item) => item.id !== task.id); setTasks(nextTasks); persist(nextTasks); }} aria-label="Delete task"><Trash2 size={17} /></button>
              </article>
            ))}
          </div>
        </section>

        <aside className="budget-column">
          <section className="panel budget-panel">
            <div className="panel-heading"><div><WalletCards size={21} /><h2>Budget</h2></div></div>
            <label className="total-budget"><span>Total wedding budget</span><div><IndianRupee size={18} /><input type="number" value={totalBudget} onChange={(event) => { const nextTotal = Number(event.target.value); setTotalBudget(nextTotal); persist(tasks, budget, nextTotal); }} /></div></label>
            <div className="budget-summary"><strong>{format(allocated)}</strong><span>allocated of {format(totalBudget)}</span></div>
            <div className="budget-track"><span style={{ width: `${Math.min(100, totalBudget ? (allocated / totalBudget) * 100 : 0)}%` }} /></div>
            <div className="budget-items">
              {budget.map((item) => (
                <label key={item.id}><span>{item.name}</span><div><IndianRupee size={14} /><input type="number" value={item.budget} onChange={(event) => { const nextBudget = budget.map((entry) => entry.id === item.id ? { ...entry, budget: Number(event.target.value) } : entry); setBudget(nextBudget); persist(tasks, nextBudget); }} /></div><button type="button" className="delete-button" onClick={() => { const nextBudget = budget.filter((entry) => entry.id !== item.id); setBudget(nextBudget); persist(tasks, nextBudget); }} aria-label={`Delete ${item.name} budget`}><Trash2 size={16} /></button></label>
              ))}
            </div>
            <form className="budget-form" onSubmit={addBudget}><input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Category" /><input type="number" value={newAmount} onChange={(event) => setNewAmount(event.target.value)} placeholder="Amount" /><button><CirclePlus size={17} /> Add</button></form>
            <div className={allocated > totalBudget ? 'budget-note budget-note--over' : 'budget-note'}>{allocated > totalBudget ? `${format(allocated - totalBudget)} over budget` : `${format(Math.max(0, totalBudget - allocated))} still available`}</div>
          </section>
        </aside>
      </div>
    </main>
  );
}
