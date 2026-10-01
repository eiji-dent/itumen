import {test} from 'node:test';
import assert from 'node:assert/strict';
import {reservationById} from '../data/reservations';
import {events} from '../data/events';
import {spotById} from '../data/spots';

test('NASPA booking is shown without an invented check-in time or private payment details',()=>{
 const reservation=reservationById('naspa');
 const checkin=events.find(event=>event.id==='d1-checkin');
 const checkout=events.find(event=>event.id==='d2-checkout');
 const hotel=spotById('naspa');
 assert.equal(reservation?.status,'booked');
 assert.equal(reservation?.verifiedAt,'2026-10-01');
 assert.equal(checkin?.timePrecision,'unknown');
 assert.equal(checkin?.startAt,null);
 assert.equal(checkout?.timeLabel,'10:00まで');
 assert.equal(checkout?.startAt,null);
 assert.match(hotel?.planLabel??'',/夕朝食付き/);
 assert.doesNotMatch(JSON.stringify({reservation,hotel,checkin,checkout}),/予約番号|決済|お支払金額/);
});
