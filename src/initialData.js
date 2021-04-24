const initialData = {
    cards:[
        {
            id: 'card-1',
            title: 'Read The Grapes of Wrath',
        },
        {
            id: 'card-2',
            title: 'Finish Death Stranding'
        },
        {
            id: 'card-3',
            title: 'Listen to CHVRCHES'
        },
        {
            id: 'card-4',
            title: 'Watch BoJack Horseman'
        },
        {
            id: 'card-5',
            title: 'Watch Grave of The Fireflies'
        },
        {
            id: 'card-6',
            title: 'Get to 2000 in Blitz on chess.com'
        },
        {
            id: 'card-7',
            title: 'Get to 2000 in Bullet on chess.com'
        },
        {
            id: 'card-8',
            title: 'Unlock the Deagle 44 in Battlefield 4 (i.e. Complete the Recoil Kinetics DLC assignment)'
        },
        {
            id: 'card-9',
            title: 'Connect DB to project'
        },
        {
            id: 'card-10',
            title: '100 push-ups'
        }
    ],
    lists:[
        {
            id: 'list-1',
            title: 'To Do List (also testing for long titles)',
            emptyText:'It looks like there any tasks left for you to do. Congrats!',
            hasCards: ['card-1', 'card-2', 'card-5', 'card-8', 'card-9']
        },
        {
            id: 'list-2',
            title: 'In Progress List',
            emptyText:'This is a bit awkward. I am no snitch but you really should be working.',
            hasCards: ['card-3', 'card-6', 'card-10']
        },
        {
            id: 'list-3',
            title: 'Done List',
            emptyText:'Why is this list empty? You could at least try to get something done.',
            hasCards: ['card-4', 'card-7']
        },
        {
            id: 'list-4',
            title: 'Needs assistance',
            emptyText:'If you cannot wrap your head around a task or it simply does not work, just drop it here and one of your supervisors will help you. You monumental fuck-up.',
            hasCards: []
        }
    ],  
    order: ['list-1', 'list-2', 'list-3', 'list-4'] 
}

export default initialData;