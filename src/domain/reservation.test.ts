import {test} from 'node:test';
import assert from 'node:assert/strict';
import {reservationById} from '../data/reservations';
import {events} from '../data/events';
import {spotById} from '../data/spots';

test('NASPA booking follows the park visit and keeps the hotel departure approximate',()=>{
 const reservation=reservationById('naspa');
 const checkin=events.find(event=>event.id==='d1-checkin');
 const checkout=events.find(event=>event.id==='d2-checkout');
 const hotel=spotById('naspa');
 assert.equal(reservation?.status,'booked');
 assert.equal(reservation?.verifiedAt,'2026-10-01');
 assert.equal(checkin?.timePrecision,'after');
 assert.equal(checkin?.startAt,null);
 assert.equal(checkout?.timeLabel,'9:30ごろ');
 assert.equal(checkout?.timePrecision,'approximate');
 assert.match(hotel?.planLabel??'',/6人1室.*夕朝食付き/);
 assert.doesNotMatch(JSON.stringify({reservation,hotel,checkin,checkout}),/予約番号|決済|お支払金額/);
});

test('fishing and BBQ remain walk-in plans, not completed bookings',()=>{
 const reservation=reservationById('fishing');
 const event=events.find(row=>row.id==='d2-fishing');
 assert.equal(reservation?.status,'onsite');
 assert.match(reservation?.publicNote??'',/現地/);
 assert.equal(event?.timeLabel,'10:00着');
 assert.equal(event?.timePrecision,'exact');
});
