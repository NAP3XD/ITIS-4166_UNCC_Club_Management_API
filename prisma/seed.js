// please run this file with 'npm run seed' to populate the database with sample data
import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear the existing data (if any)
  // await prisma.eventRSVP.deleteMany();
  // await prisma.event.deleteMany();
  // await prisma.clubAnnouncement.deleteMany();
  // await prisma.clubMembership.deleteMany();
  // await prisma.club.deleteMany();
  // await prisma.user.deleteMany();

  // default pass for all test users 'password123' 
  const hashedPassword = await bcrypt.hash('password123', 10);

  // API admins
  const apiAdmins = await Promise.all([
    prisma.user.create({
      data: {
        email: 'norm@uncc.edu',
        password: hashedPassword,
        name: 'Norm',
        role: 'API_ADMIN',
      },
    }),
    prisma.user.create({
      data: {
        email: 'nick@uncc.edu',
        password: hashedPassword,
        name: 'Nick',
        role: 'API_ADMIN',
      },
    }),
    prisma.user.create({
      data: {
        email: 'heidi@uncc.edu',
        password: hashedPassword,
        name: 'Heidi',
        role: 'API_ADMIN',
      },
    }),
  ]);

  console.log('Created API Admins:', apiAdmins.map(u => u.name).join(', '));

  // some club members
  const clubMembers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'nicholas@uncc.edu',
        password: hashedPassword,
        name: 'Nicholas',
        role: 'CLUB_MEMBER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'moses@uncc.edu',
        password: hashedPassword,
        name: 'Moses',
        role: 'CLUB_MEMBER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'dante@uncc.edu',
        password: hashedPassword,
        name: 'Dante',
        role: 'CLUB_MEMBER',
      },
    }),
    prisma.user.create({
      data: {
        email: 'tonyhawk@uncc.edu',
        password: hashedPassword,
        name: 'Tony Hawk',
        role: 'CLUB_MEMBER',
      },
    }),
  ]);

  console.log('✓ Created Club Members:', clubMembers.map(u => u.name).join(', '));

  // a few clubs
  const clubs = await Promise.all([
    prisma.club.create({
      data: {
        name: 'UNCC_Skateboarding',
        description: 'Skateboarding club for all skill levels at UNC Charlotte',
        adminId: apiAdmins[0].id,
      },
    }),
    prisma.club.create({
      data: {
        name: '49th Security Division',
        description: 'Cybersecurity and information security club',
        adminId: apiAdmins[1].id,
      },
    }),
    prisma.club.create({
      data: {
        name: '49er Drone Club',
        description: 'Drone enthusiasts and aerial photography club',
        adminId: apiAdmins[2].id,
      },
    }),
    prisma.club.create({
      data: {
        name: 'Archery',
        description: 'Traditional and modern archery club',
        adminId: apiAdmins[0].id,
      },
    }),
  ]);

  console.log('Created Clubs:', clubs.map(c => c.name).join(', '));

  // default users joining clubs
  await Promise.all([
    prisma.clubMembership.create({
      data: {
        userId: clubMembers[0].id,
        clubId: clubs[0].id,
      },
    }),
    prisma.clubMembership.create({
      data: {
        userId: clubMembers[0].id,
        clubId: clubs[3].id,
      },
    }),
    prisma.clubMembership.create({
      data: {
        userId: clubMembers[1].id,
        clubId: clubs[1].id,
      },
    }),
    prisma.clubMembership.create({
      data: {
        userId: clubMembers[2].id,
        clubId: clubs[2].id,
      },
    }),
    prisma.clubMembership.create({
      data: {
        userId: clubMembers[3].id,
        clubId: clubs[0].id,
      },
    }),
  ]);

  console.log('Created sample club memberships');

  // some sample announcements
  await Promise.all([
    prisma.clubAnnouncement.create({
      data: {
        clubId: clubs[0].id,
        title: 'Welcome to UNCC Skateboarding!',
        content: 'Join us every Friday at 4 PM at the Star Quad.',
      },
    }),
    prisma.clubAnnouncement.create({
      data: {
        clubId: clubs[0].id,
        title: 'Spring Sk8 Tournament',
        content: 'Get ready for our annual Spring Sk8 Tournament! Join us for an action-packed day of skateboarding competition. All skill levels welcome. Registration opens March 1st.',
      },
    }),
    prisma.clubAnnouncement.create({
      data: {
        clubId: clubs[1].id,
        title: 'Security Workshop This Week',
        content: 'Learn about ethical hacking and penetration testing.',
      },
    }),
  ]);

  console.log('Created sample announcements');

  // sample events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        clubId: clubs[0].id,
        title: 'Spring Sk8 Tournament',
        description: 'Annual skateboarding competition featuring street and vert competitions. Prizes for top 3 in each category!',
        location: 'UNCC Campus Skate Park',
        eventDate: new Date('2025-04-15T14:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        clubId: clubs[0].id,
        title: 'Beginner Skateboarding Workshop',
        description: 'Learn the basics of skateboarding in a safe and fun environment. All equipment provided.',
        location: 'UNCC Campus Skate Park',
        eventDate: new Date('2025-03-20T16:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        clubId: clubs[1].id,
        title: 'Capture The Flag Competition',
        description: 'Test your hacking skills in our CTF competition. Prizes for winners!',
        location: 'Woodward Hall - Room 210',
        eventDate: new Date('2025-03-25T18:00:00'),
      },
    }),
    prisma.event.create({
      data: {
        clubId: clubs[2].id,
        title: 'Drone Racing Championship',
        description: 'Show off your piloting skills in our annual drone racing event.',
        location: 'North Quad',
        eventDate: new Date('2025-04-10T13:00:00'),
      },
    }),
  ]);

  console.log('Created sample events');

  // some event RSVPs
  await Promise.all([
    prisma.eventRSVP.create({
      data: {
        userId: clubMembers[0].id,
        eventId: events[0].id,
        status: 'ATTENDING',
      },
    }),
    prisma.eventRSVP.create({
      data: {
        userId: clubMembers[3].id,
        eventId: events[0].id,
        status: 'ATTENDING',
      },
    }),
    prisma.eventRSVP.create({
      data: {
        userId: clubMembers[3].id,
        eventId: events[1].id,
        status: 'ATTENDING',
      },
    }),
    prisma.eventRSVP.create({
      data: {
        userId: clubMembers[1].id,
        eventId: events[2].id,
        status: 'ATTENDING',
      },
    }),
    prisma.eventRSVP.create({
      data: {
        userId: clubMembers[2].id,
        eventId: events[3].id,
        status: 'ATTENDING',
      },
    }),
  ]);

  console.log('Created sample event RSVPs');
  console.log('\nSeed completed successfully!');
  console.log('\nDefault credentials for all users:');
  console.log('Password: password123');
  console.log('\nAPI Admins:');
  apiAdmins.forEach(admin => console.log(`  - ${admin.email}`));
  console.log('\nClub Members:');
  clubMembers.forEach(member => console.log(`  - ${member.email}`));
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
