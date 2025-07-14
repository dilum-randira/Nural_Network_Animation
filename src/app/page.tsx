export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      gap: '16px'
    }}>
      <h1 style={{ 
        fontSize: '2.25rem',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        Welcome to Neural Network Explorer
      </h1>
      <p style={{ 
        fontSize: '1.125rem',
        textAlign: 'center',
        maxWidth: '42rem',
        color: '#4B5563'
      }}>
        An interactive platform for learning about neural networks through visualizations and hands-on examples.
      </p>
    </div>
  );
}
